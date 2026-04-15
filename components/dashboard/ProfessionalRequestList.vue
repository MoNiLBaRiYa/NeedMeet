<template>
  <div class="space-y-4">
    <!-- Booking Requests List -->
    <div v-if="bookings.length > 0" class="space-y-4 animate-in fade-in slide-in-from-right-2 duration-500">
      <DashboardProfessionalBookingCard 
        v-for="booking in sortedBookings" 
        :key="booking.id" 
        :booking="booking" 
        @accept="id => $emit('accept', id)"
        @reject="id => $emit('reject', id)"
      />
    </div>

    <!-- Improved Empty State -->
    <div v-else class="py-16 text-center border-2 border-dashed border-gray-100 rounded-[2.5rem] bg-white">
      <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
        <Icon name="heroicons:inbox" size="32" />
      </div>
      <h3 class="text-lg font-black text-slate-900 mb-2">No requests yet</h3>
      <p class="text-gray-500 mb-2 max-w-xs mx-auto">When customers book your services, they will appear here.</p>
      <p class="text-xs font-bold text-[#A8CC00] uppercase tracking-widest">Stay tuned!</p>
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
