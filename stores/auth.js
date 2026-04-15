import { defineStore } from 'pinia';
import { firestoreApi } from '../utils/firestoreApi';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    role: null, 
    initialized: false,
    fullName: null,
    phone: null
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    userData: (state) => {
      if (!state.user) return null;
      return {
        uid: state.user.uid,
        email: state.user.email,
        // Return raw value so templates react correctly after save
        fullName: state.fullName || '',
        phone: state.phone || '',
        role: state.role
      };
    }
  },
  actions: {
    async initAuth() {
      if (!process.client) return;
      
      try {
        const { onAuthStateChanged } = await import('firebase/auth');
        const nuxtApp = useNuxtApp();
        const { $firebaseAuth } = nuxtApp;
        
        if (!$firebaseAuth) {
          this.initialized = true;
          return;
        }

        onAuthStateChanged($firebaseAuth, async (firebaseUser) => {
          this.loading = true;
          try {
            if (firebaseUser) {
              this.user = firebaseUser;
              
              // Fetch user profile from Firestore
              const profile = await firestoreApi.getUserProfile(firebaseUser.uid);
              if (profile) {
                // Only overwrite role if Firestore actually has one — never set it to undefined
                if (profile.role) this.role = profile.role;
                this.fullName = profile.fullName || '';
                this.phone = profile.phone || '';
              }
            } else {
              this.user = null;
              this.role = null;
              this.fullName = null;
              this.phone = null;
            }
          } catch (err) {
            console.error('Error fetching user profile:', err);
          } finally {
            this.loading = false;
            this.initialized = true;
          }
        });
      } catch (err) {
        console.error('Auth initialization failed:', err);
        this.initialized = true;
      }
    },

    async updateProfileData(updatedData) {
      if (!this.user) return;
      
      this.loading = true;
      try {
        // Always include the current role so a missing Firestore field gets restored
        await firestoreApi.updateUserProfile(this.user.uid, {
          ...updatedData,
          ...(this.role ? { role: this.role } : {})
        });
        
        // Update local state
        if (updatedData.fullName !== undefined) this.fullName = updatedData.fullName;
        if (updatedData.phone !== undefined) this.phone = updatedData.phone;
        
        return true;
      } catch (err) {
        this.error = 'Failed to update profile.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const { loginUser } = useAuth();
        const { user, role } = await loginUser(email, password);
        this.user = user;
        this.role = role;
        
        // Fetch full profile immediately
        const profile = await firestoreApi.getUserProfile(user.uid);
        if (profile) {
          this.fullName = profile.fullName || '';
          this.phone = profile.phone || '';
          
          // Sync role from Firestore too — avoids timing race with onAuthStateChanged
          if (profile.role) this.role = profile.role;
        }
      } catch (err) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async register(email, password, role, fullName = '') {
      this.loading = true;
      this.error = null;
      try {
        const { registerUser } = useAuth();
        const { user, role: savedRole } = await registerUser(email, password, role, fullName);
        this.user = user;
        this.role = savedRole;
        this.fullName = fullName;
        this.phone = '';
      } catch (err) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      try {
        const { logoutUser } = useAuth();
        await logoutUser();
        this.user = null;
        this.role = null;
        this.fullName = null;
        this.phone = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
});
