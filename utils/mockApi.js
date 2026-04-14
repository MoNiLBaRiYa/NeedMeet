/**
 * Helper to simulate network latency
 * @param {number} min 
 * @param {number} max 
 * @returns {Promise<void>}
 */
const simulateLatency = (min = 500, max = 1000) => {
  const delay = Math.floor(Math.random() * (max - min + 1) + min);
  return new Promise(resolve => setTimeout(resolve, delay));
};

export const mockApi = {
  /**
   * Fetch all service categories
   */
  async getCategories() {
    await simulateLatency();
    try {
      return await $fetch('/mock-data/categories.json');
    } catch (error) {
      console.error('MockApi-Error [getCategories]:', error);
      return [];
    }
  },

  /**
   * Fetch subcategories, optionally filtered by categoryId
   * @param {string} [categoryId] 
   */
  async getSubcategories(categoryId = null) {
    await simulateLatency();
    try {
      const allSubcategories = await $fetch('/mock-data/subcategories.json');
      if (categoryId) {
        return allSubcategories.filter(s => s.categoryId === categoryId);
      }
      return allSubcategories;
    } catch (error) {
      console.error('MockApi-Error [getSubcategories]:', error);
      return [];
    }
  },

  /**
   * Fetch professionals, optionally filtered by subcategoryId
   * @param {string} [subcategoryId] 
   */
  async getProfessionals(subcategoryId = null) {
    await simulateLatency();
    try {
      const allProfessionals = await $fetch('/mock-data/professionals.json');
      if (subcategoryId) {
        return allProfessionals.filter(p => p.subcategoryId === subcategoryId);
      }
      return allProfessionals;
    } catch (error) {
      console.error('MockApi-Error [getProfessionals]:', error);
      return [];
    }
  },

  /**
   * Fetch a single professional by ID
   * @param {string} id 
   */
  async getProfessionalById(id) {
    await simulateLatency();
    try {
      const allProfessionals = await $fetch('/mock-data/professionals.json');
      return allProfessionals.find(p => p.id === id) || null;
    } catch (error) {
      console.error('MockApi-Error [getProfessionalById]:', error);
      return null;
    }
  },

  /**
   * Fetch reviews for a specific professional
   * @param {string} professionalId 
   */
  async getReviews(professionalId) {
    await simulateLatency();
    try {
      const allReviews = await $fetch('/mock-data/reviews.json');
      return allReviews.filter(r => r.professionalId === professionalId);
    } catch (error) {
      console.error('MockApi-Error [getReviews]:', error);
      return [];
    }
  },

  /**
   * Handle Bookings (Persistent via LocalStorage with JSON Seed)
   * @param {string} id - Either customerId or professionalId
   * @param {string} role - 'customer' or 'professional'
   */
  async getBookings(id, role = 'customer') {
    await simulateLatency();
    try {
      const { getItem } = useLocalStorage();
      
      // 1. Get seed bookings from JSON
      const seedBookings = await $fetch('/mock-data/bookings.json');
      
      // 2. Get new bookings from LocalStorage
      const localBookings = getItem('needmeet_bookings') || [];
      
      // 3. Merge
      const allBookings = [...seedBookings, ...localBookings];
      
      // 4. Filter by role
      if (!id) return allBookings;

      if (role === 'professional') {
        return allBookings.filter(b => b.professionalId === id);
      }
      return allBookings.filter(b => b.customerId === id);
    } catch (error) {
      console.error('MockApi-Error [getBookings]:', error);
      return [];
    }
  },

  /**
   * Update the status of a booking
   * @param {string} id 
   * @param {string} status - 'pending', 'confirmed', 'rejected'
   */
  async updateBookingStatus(id, status) {
    await simulateLatency();
    try {
      const { getItem, setItem } = useLocalStorage();
      
      // Note: We currently only update bookings in LocalStorage for MVP
      // Seed data (JSON) is read-only in this mock setup.
      const localBookings = getItem('needmeet_bookings') || [];
      const updatedLocal = localBookings.map(b => {
        if (b.id === id) {
          return { ...b, status };
        }
        return b;
      });

      setItem('needmeet_bookings', updatedLocal);
      
      // Find the updated booking (to return)
      return updatedLocal.find(b => b.id === id) || null;
    } catch (error) {
      console.error('MockApi-Error [updateBookingStatus]:', error);
      throw error;
    }
  },

  /**
   * Create a new booking
    await simulateLatency();
    try {
      const { getItem, setItem } = useLocalStorage();
      
      const newBooking = {
        id: `book_${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...bookingData
      };

      const localBookings = getItem('needmeet_bookings') || [];
      localBookings.push(newBooking);
      setItem('needmeet_bookings', localBookings);
      
      return newBooking;
    } catch (error) {
      console.error('MockApi-Error [createBooking]:', error);
      throw error;
    }
  }
};
