import { defineStore } from 'pinia';
import { firestoreApi } from '../utils/firestoreApi';
import { useAuthStore } from './auth';

export const useBookingStore = defineStore('booking', () => {
  const bookings = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchBookings() {
    loading.value = true;
    error.value = null;
    try {
      const authStore = useAuthStore();
      const userId = authStore.user?.uid;
      const role = authStore.role;
      
      if (!userId) return;
      
      bookings.value = await firestoreApi.getBookings(userId, role);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      error.value = 'Failed to load bookings.';
    } finally {
      loading.value = false;
    }
  }

  async function updateStatus(id, status) {
    loading.value = true;
    error.value = null;
    try {
      await firestoreApi.updateBookingStatus(id, status);
      
      // Update local 
      const index = bookings.value.findIndex(b => b.id === id);
      if (index !== -1) {

        bookings.value[index] = { ...bookings.value[index], status, updatedAt: new Date().toISOString() };
        
      }
    } catch (err) {

      error.value = `Failed to update booking to ${status}.`;

      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function createBooking(bookingData) {
    loading.value = true;
    error.value = null;
    try {
      const newBooking = await firestoreApi.createBooking(bookingData);
      bookings.value.unshift(newBooking);
      return newBooking;
    } catch (err) {
      error.value = 'Failed to create booking.';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function cancelBooking(id) {
    return updateStatus(id, 'cancelled');
  }

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    updateStatus,
    createBooking,
    cancelBooking
  };
});
