<template>
  <div class="space-y-4">
    <!-- Simple Loading State -->
    <div v-if="loading" class="text-gray-500 font-medium py-4">
      Loading bookings...
    </div>

    <!-- Bookings List -->
    <div v-else-if="bookings.length > 0" class="space-y-4">
      <DashboardBookingCard 
        v-for="booking in sortedBookings" 
        :key="booking.id" 
        :booking="booking" 
      />
    </div>

    <!-- Simple Empty State -->
    <div v-else class="p-12 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50">
      <p class="text-gray-500 mb-4">No bookings yet.</p>
      <NuxtLink to="/explore" class="text-slate-900 font-bold underline">
        Browse experts
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  bookings: { type: Array, required: true },
  loading: { type: Boolean, default: false }
});

const sortedBookings = computed(() => {
  return [...props.bookings].sort((a, b) => new Date(b.date) - new Date(a.date));
});
</script>
