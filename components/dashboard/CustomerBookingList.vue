<template>
  <div class="space-y-4">
    <!-- Bookings List -->
    <div v-if="bookings.length > 0" class="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <DashboardBookingCard  v-for="booking in sortedBookings"  :key="booking.id"  :booking="booking"  @cancel="id => $emit('cancel', id)"/>
    </div>


    <div v-else class="py-16 text-center border-2 border-dashed border-gray-100 rounded-[2.5rem] bg-white">
      <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
        <Icon name="heroicons:calendar" size="32" />
      </div>
      <h3 class="text-lg font-black text-slate-900 mb-2">
        No bookings found
      </h3>
      <p class="text-gray-500 mb-8 max-w-xs mx-auto">
        You haven't booked any expert services yet.
      </p>
      <NuxtLink to="/BrowseProfessionals"  class="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-[#C1ED00] hover:text-slate-900 transition-all active:scale-95 shadow-lg shadow-slate-200">

        <span>Browse Professional</span>
        
        <Icon name="heroicons:arrow-right-16-solid" size="16" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  bookings: { type: Array, required: true },
  loading: { type: Boolean, default: false }
});

defineEmits(['cancel']);

const sortedBookings = computed(() => {

  return [...props.bookings].sort((a, b) => new Date(b.date) - new Date(a.date));
});
</script>
