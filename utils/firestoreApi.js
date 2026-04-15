import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  serverTimestamp,
  orderBy
} from 'firebase/firestore';

export const firestoreApi = {
  // --- USER PROFILES ---
  
  async updateUserProfile(uid, data) {
    const { $firebaseDb } = useNuxtApp();
    const userRef = doc($firebaseDb, 'users', uid);
    await setDoc(userRef, { 
      ...data, 
      updatedAt: serverTimestamp() 
    }, { merge: true });
    return true;
  },

  async getUserProfile(uid) {
    const { $firebaseDb } = useNuxtApp();
    const userRef = doc($firebaseDb, 'users', uid);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? docSnap.data() : null;
  },

  // --- BOOKINGS ---

  async createBooking(bookingData) {
    const { $firebaseDb } = useNuxtApp();
    const bookingsRef = collection($firebaseDb, 'bookings');
    
    const newBooking = {
      ...bookingData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(bookingsRef, newBooking);
    return { id: docRef.id, ...newBooking };
  },

  async getBookings(userId, role = 'customer') {
    const { $firebaseDb } = useNuxtApp();
    const bookingsRef = collection($firebaseDb, 'bookings');
    
    const field = role === 'professional' ? 'professionalId' : 'customerId';
    const q = query(
      bookingsRef, 
      where(field, '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async updateBookingStatus(id, status) {
    const { $firebaseDb } = useNuxtApp();
    const bookingRef = doc($firebaseDb, 'bookings', id);
    await updateDoc(bookingRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return true;
  }
};
