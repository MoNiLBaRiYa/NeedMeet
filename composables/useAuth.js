export const useAuth = () => {
  const registerUser = async (email, password, role) => {
    const { createUserWithEmailAndPassword } = await import('firebase/auth');
    const { doc, setDoc } = await import('firebase/firestore');
    
    const { $firebaseAuth, $firebaseDb } = useNuxtApp();
    
    const userCredential = await createUserWithEmailAndPassword($firebaseAuth, email, password);
    const user = userCredential.user;
    
    const userDocRef = doc($firebaseDb, 'users', user.uid);
    await setDoc(userDocRef, {
      email: user.email,
      role: role,
      createdAt: new Date().toISOString()
    });
    
    return { user, role };
  };

  const loginUser = async (email, password) => {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const { doc, getDoc } = await import('firebase/firestore');
    
    const { $firebaseAuth, $firebaseDb } = useNuxtApp();
    
    const userCredential = await signInWithEmailAndPassword($firebaseAuth, email, password);
    const user = userCredential.user;
    
    const userDocRef = doc($firebaseDb, 'users', user.uid);
    const docSnap = await getDoc(userDocRef);
    
    let role = null;
    if (docSnap.exists()) {
      role = docSnap.data().role;
    }
    
    return { user, role };
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
