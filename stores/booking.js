import { defineStore } from 'pinia';
import { mockApi } from '../utils/mockApi';
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
      const userId = authStore.user?.id;
      const role = authStore.role;
      
      bookings.value = await mockApi.getBookings(userId, role);
    } catch (err) {
      error.value = 'Failed to load bookings.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function updateStatus(id, status) {
    loading.value = true;
    error.value = null;
    try {
      const updatedBooking = await mockApi.updateBookingStatus(id, status);
      if (updatedBooking) {
        // Update local state for immediate UI feedback
        const index = bookings.value.findIndex(b => b.id === id);
        if (index !== -1) {
          bookings.value[index] = updatedBooking;
        }
      }
      return updatedBooking;
    } catch (err) {
      error.value = `Failed to update booking to ${status}.`;
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function createBooking(bookingData) {
    loading.value = true;
    error.value = null;
    try {
      const newBooking = await mockApi.createBooking(bookingData);
      bookings.value.push(newBooking);
      return newBooking;
    } catch (err) {
      error.value = 'Failed to create booking.';
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking
  };
});
