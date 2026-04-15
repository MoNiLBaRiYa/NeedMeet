import { getAuthErrorMessage } from '../utils/authErrors';

export const useAuth = () => {
  const registerUser = async (email, password, role, fullName = '') => {
    const { createUserWithEmailAndPassword } = await import('firebase/auth');
    const { doc, setDoc } = await import('firebase/firestore');
    
    const { $firebaseAuth, $firebaseDb } = useNuxtApp();
    
    try {
      const userCredential = await createUserWithEmailAndPassword($firebaseAuth, email, password);
      const user = userCredential.user;

      const userDocRef = doc($firebaseDb, 'users', user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        role: role,
        fullName: fullName,
        phone: '',
        createdAt: new Date().toISOString()
      });
      
      return { user, role };
    } catch (error) {
      console.error('Registration Error:', error);
      throw new Error(getAuthErrorMessage(error.code, error.message));
    }
  };
//Aa function existing user ne login kare che.
  const loginUser = async (email, password) => {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const { doc, getDoc } = await import('firebase/firestore');
    
    const { $firebaseAuth, $firebaseDb } = useNuxtApp();
    
    try {
      const userCredential = await signInWithEmailAndPassword($firebaseAuth, email, password);
      //Firebase ma user create kare
      const user = userCredential.user;
      
      const userDocRef = doc($firebaseDb, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);
      //Firestore maathi check kare ke aa user no role su che
      let role = null;
      if (docSnap.exists()) {
        role = docSnap.data().role;
      }
      
      return { user, role };
    } catch (error) {
      console.error('Login Error:', error);
      throw new Error(getAuthErrorMessage(error.code, error.message));
    }
  };

  const logoutUser = async () => {
    const { signOut } = await import('firebase/auth');
    const { $firebaseAuth } = useNuxtApp();
    await signOut($firebaseAuth);
  };

  return {
    registerUser,
    loginUser,
    logoutUser
  };
};
