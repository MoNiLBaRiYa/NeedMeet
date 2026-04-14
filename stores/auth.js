import { defineStore } from 'pinia';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    role: null, // 'customer' or 'professional'
    initialized: false,
    profileOverrides: {
      fullName: null,
      phone: null
    }
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    // Merged user data for UI display
    userData: (state) => {
      if (!state.user) return null;
      return {
        ...state.user,
        fullName: state.profileOverrides.fullName || state.user.displayName || 'User',
        phone: state.profileOverrides.phone || state.user.phoneNumber || ''
      };
    }
  },
  actions: {
    async initAuth() {
      if (!process.client) return;
      
      // Load local overrides
      const { getItem } = useLocalStorage();
      const overrides = getItem('needmeet_profile_overrides');
      if (overrides) {
        this.profileOverrides = overrides;
      }

      try {
        const { onAuthStateChanged } = await import('firebase/auth');
        const { doc, getDoc } = await import('firebase/firestore');
        
        const nuxtApp = useNuxtApp();
        const { $firebaseAuth, $firebaseDb } = nuxtApp;
        
        if (!$firebaseAuth) {
          console.warn('Firebase Auth ($firebaseAuth) is not available yet.');
          return;
        }

        onAuthStateChanged($firebaseAuth, async (firebaseUser) => {
          this.loading = true;
          try {
            if (firebaseUser) {
              this.user = firebaseUser;

              // Role fetch
              const userDocRef = doc($firebaseDb, 'users', firebaseUser.uid);
              const docSnap = await getDoc(userDocRef);
              if (docSnap.exists()) {
                this.role = docSnap.data().role;
              }
            } else {
              this.user = null;
              this.role = null;
            }
          } catch (err) {
            console.error("Error in onAuthStateChanged listener:", err);
          } finally {
            this.loading = false;
            this.initialized = true;
          }
        });
      } catch (err) {
        console.error('Failed to initialize Auth store:', err);
      }
    },
    async updateProfileData(updatedData) {
      if (!process.client) return;
      
      const { setItem } = useLocalStorage();
      this.profileOverrides = {
        ...this.profileOverrides,
        ...updatedData
      };
      
      setItem('needmeet_profile_overrides', this.profileOverrides);
      return this.profileOverrides;
    },
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const { loginUser } = useAuth();
        const { user, role } = await loginUser(email, password);
        this.user = user;
        this.role = role;
      } catch (err) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async register(email, password, role) {
      this.loading = true;
      this.error = null;
      try {
        const { registerUser } = useAuth();
        const { user, role: savedRole } = await registerUser(email, password, role);
        this.user = user;
        this.role = savedRole;
      } catch (err) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      this.loading = true;
      this.error = null;
      try {
        const { logoutUser } = useAuth();
        await logoutUser();
        this.user = null;
        this.role = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
});
