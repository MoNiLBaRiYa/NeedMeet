<template>
  <div class="space-y-4">
    <div v-if="loading" class="text-gray-500 font-medium py-4">
      Loading requests...
    </div>

    <div v-else-if="bookings.length > 0" class="space-y-4">
      <DashboardProfessionalBookingCard 
        v-for="booking in sortedBookings" 
        :key="booking.id" 
        :booking="booking" 
        @accept="id => $emit('accept', id)"
        @reject="id => $emit('reject', id)"
      />
    </div>

    <div v-else class="p-12 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50">
      <p class="text-gray-500">No booking requests found.</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  bookings: { type: Array, required: true },
  loading: { type: Boolean, default: false }
});

defineEmits(['accept', 'reject']);

const sortedBookings = computed(() => {
  return [...props.bookings].sort((a, b) => new Date(b.date) - new Date(a.date));
});
</script>
