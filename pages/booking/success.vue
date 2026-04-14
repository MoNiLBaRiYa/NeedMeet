<template>
  <div class="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
    <div class="max-w-md w-full bg-white rounded-[3rem] p-10 shadow-2xl shadow-slate-200/60 border border-gray-100 text-center space-y-8 animate-in zoom-in-95 duration-500">
      
      <!-- Success Icon -->
      <div class="w-24 h-24 bg-[#C1ED00] rounded-[2rem] flex items-center justify-center mx-auto shadow-lg shadow-[#C1ED00]/30 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div class="space-y-3">
        <h1 class="text-4xl font-black text-slate-900 tracking-tight">Confirmed!</h1>
        <p class="text-gray-500 font-medium">Your booking has been successfully placed and is ready for the expert.</p>
      </div>

      <!-- Booking Card -->
      <div class="bg-slate-50 border border-gray-100 rounded-2xl p-6 text-left space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-xs font-black text-gray-400 uppercase tracking-widest">ID</span>
          <span class="text-sm font-bold text-slate-900">#{{ lastBooking?.id.slice(-6) }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-xs font-black text-gray-400 uppercase tracking-widest">Service</span>
          <span class="text-sm font-black text-slate-900">{{ lastBooking?.service }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-xs font-black text-gray-400 uppercase tracking-widest">When</span>
          <span class="text-sm font-bold text-slate-900">{{ lastBooking?.date }} @ {{ lastBooking?.time }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="pt-4 space-y-4">
        <NuxtLink 
          to="/dashboard" 
          class="block w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-[#C1ED00] hover:text-slate-900 transition-all shadow-xl active:scale-95"
        >
          Go to Dashboard
        </NuxtLink>
        <NuxtLink 
          to="/" 
          class="block w-full py-4 text-gray-400 hover:text-slate-600 font-bold transition-colors"
        >
          Book another service
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBookingStore } from '../../stores/booking';

const bookingStore = useBookingStore();
const lastBooking = computed(() => bookingStore.bookings[bookingStore.bookings.length - 1]);

onMounted(async () => {
  if (bookingStore.bookings.length === 0) {
    await bookingStore.fetchBookings();
  }
});

useHead({
  title: 'Booking Confirmed - NeedMeet'
});
</script>
