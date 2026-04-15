<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-black text-slate-900">
        Welcome back, {{ authStore.user?.fullName }}
      </h1>
      <p class="text-gray-500 text-sm">Summary of your account activity.</p>
    </header>
    
   
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <DashboardStatsCard  title="Total Bookings"  :value="bookingStore.bookings.length" />
      <DashboardStatsCard  title="Total Spend"  :value="totalSpend"  prefix="₹"/>
    </div>

    <!-- Bookings List -->
    <section class="space-y-6">
      <div class="flex justify-between items-center pb-4 border-b border-gray-100">
        <h2 class="text-xl font-bold text-slate-900">
          Recent Bookings
        </h2>
        <NuxtLink to="/BrowseProfessionals" class="text-sm font-bold text-slate-900 hover:underline">
          New Booking &rarr;
        </NuxtLink>
      </div>

      <DashboardCustomerBookingList  :bookings="bookingStore.bookings"  :loading="bookingStore.loading"  @cancel="handleCancelBooking"/>
    </section>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';
import { useBookingStore } from '../../stores/booking';

definePageMeta({
  layout: 'dashboard'
});

const authStore = useAuthStore();
const bookingStore = useBookingStore();
const { addPopup } = useMessagePopup();

const handleCancelBooking = async (id) => {
  if (!confirm('Are you sure you want to cancel this booking?')) return;
  
  try {
    await bookingStore.cancelBooking(id);
    addPopup('Booking cancelled successfully', 'success');
  } catch (err) {
    addPopup(err.message || 'Failed to cancel booking', 'error');
  }
};

const totalSpend = computed(() => {
  return bookingStore.bookings
    .filter(b => b.status !== 'cancelled' && b.status !== 'rejected')
    .reduce((sum, b) => sum + (Number(b.price) || 0), 0);
});

onMounted(() => {
  bookingStore.fetchBookings();
});
</script>
