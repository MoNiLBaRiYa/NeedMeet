<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-black text-slate-900">
        Professional Dashboard
      </h1>
      <p class="text-gray-500 text-sm">Manage your service requests and earnings.</p>
    </header>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <DashboardStatsCard 
        title="Total Earnings" 
        :value="totalEarnings" 
        prefix="₹"
      />
      <DashboardStatsCard 
        title="New Requests" 
        :value="pendingCount" 
      />
    </div>

    <!-- Requests List -->
    <section class="space-y-6">
      <div class="pb-4 border-b border-gray-100">
        <h2 class="text-xl font-bold text-slate-900">Service Requests</h2>
      </div>

      <DashboardProfessionalRequestList 
        :bookings="bookingStore.bookings" 
        :loading="bookingStore.loading" 
        @accept="id => updateBookingStatus(id, 'confirmed')"
        @reject="id => updateBookingStatus(id, 'rejected')"
      />
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

const totalEarnings = computed(() => {
  return bookingStore.bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + (Number(b.price) || 0), 0);
});

const pendingCount = computed(() => {
  return bookingStore.bookings.filter(b => b.status === 'pending').length;
});

const updateBookingStatus = async (id, status) => {
  try {
    await bookingStore.updateStatus(id, status);
  } catch (err) {
    alert(err.message || 'Failed to update status');
  }
};

onMounted(() => {
  bookingStore.fetchBookings();
});
</script>
