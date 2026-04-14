<template>
  <div class="min-h-screen bg-gray-50 py-12 px-6">
    <div class="container mx-auto max-w-2xl">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="animate-spin w-10 h-10 border-4 border-[#C1ED00] border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-500 font-bold">Loading booking details...</p>
      </div>

      <!-- Professional Not Found -->
      <div v-else-if="!professional" class="text-center py-20 bg-white rounded-[3rem] shadow-xl">
        <h2 class="text-2xl font-black text-slate-900 mb-4">Professional not found</h2>
        <NuxtLink to="/" class="inline-block px-8 py-3 bg-slate-900 text-white font-bold rounded-xl">Back to Home</NuxtLink>
      </div>

      <!-- Booking Form -->
      <div v-else class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header class="text-center space-y-2">
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Complete your Booking</h1>
          <p class="text-gray-500">Booking a session with <span class="text-slate-900 font-bold">{{ professional.fullName }}</span></p>
        </header>

        <div class="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-gray-100">
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Service Selection -->
            <div class="space-y-3">
              <label class="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Select Service</label>
              <select 
                v-model="bookingForm.serviceId" 
                class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-slate-900 font-bold focus:border-[#C1ED00] focus:ring-4 focus:ring-[#C1ED00]/10 transition-all cursor-pointer appearance-none"
              >
                <option value="" disabled>Choose a service</option>
                <option v-for="service in professional.services" :key="service.id" :value="service.id">
                  {{ service.name }} - ₹{{ service.price }}
                </option>
              </select>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Date Picker -->
              <div class="space-y-3">
                <label class="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Preferred Date</label>
                <input 
                  type="date" 
                  v-model="bookingForm.date"
                  :min="today"
                  class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-slate-900 font-bold focus:border-[#C1ED00] focus:ring-4 focus:ring-[#C1ED00]/10 transition-all"
                />
              </div>

              <!-- Time Slots -->
              <div class="space-y-3">
                <label class="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Available Time Slot</label>
                <select 
                  v-model="bookingForm.time" 
                  class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-slate-900 font-bold focus:border-[#C1ED00] focus:ring-4 focus:ring-[#C1ED00]/10 transition-all cursor-pointer appearance-none"
                >
                  <option value="" disabled>Choose a time</option>
                  <option v-for="slot in timeSlots" :key="slot" :value="slot">{{ slot }}</option>
                </select>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="validationError" class="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold animate-in shake duration-300">
              ⚠️ {{ validationError }}
            </div>

            <!-- Booking Summary -->
            <div v-if="selectedService" class="p-6 bg-slate-900 rounded-[2rem] text-white">
              <div class="flex justify-between items-center mb-4 pb-4 border-b border-slate-800">
                <span class="text-gray-400 font-medium">Service Fee</span>
                <span class="text-xl font-black">₹{{ selectedService.price }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-[#C1ED00] font-black uppercase tracking-widest text-xs">Total to Pay</span>
                <span class="text-3xl font-black text-[#C1ED00]">₹{{ selectedService.price }}</span>
              </div>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              :disabled="submitting"
              class="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-[#C1ED00] hover:text-slate-900 transition-all shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {{ submitting ? 'Processing...' : 'Confirm Booking' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProfessionalStore } from '../../stores/professional';
import { useBookingStore } from '../../stores/booking';
import { useAuthStore } from '../../stores/auth';

const route = useRoute();
const router = useRouter();
const proStore = useProfessionalStore();
const bookingStore = useBookingStore();
const authStore = useAuthStore();

const professional = ref(null);
const loading = ref(true);
const submitting = ref(false);
const validationError = ref('');

const today = new Date().toISOString().split('T')[0];
const timeSlots = ['9 AM', '11 AM', '1 PM', '3 PM', '5 PM'];

const bookingForm = ref({
  serviceId: '',
  date: today,
  time: ''
});

const selectedService = computed(() => {
  if (!professional.value || !bookingForm.value.serviceId) return null;
  return professional.value.services.find(s => s.id === bookingForm.value.serviceId);
});

const handleSubmit = async () => {
  validationError.value = '';
  
  // Validation
  if (!bookingForm.value.serviceId || !bookingForm.value.date || !bookingForm.value.time) {
    validationError.value = 'Please fill in all fields to complete your booking.';
    return;
  }

  submitting.value = true;
  try {
    const bookingPayload = {
      userId: authStore.user.id,
      professionalId: professional.value.id,
      professionalName: professional.value.fullName,
      service: selectedService.value.name,
      date: bookingForm.value.date,
      time: bookingForm.value.time,
      price: selectedService.value.price,
      status: 'confirmed'
    };

    await bookingStore.createBooking(bookingPayload);
    router.push('/booking/success');
  } catch (err) {
    validationError.value = 'Something went wrong. Please try again.';
  } finally {
    submitting.value = false;
  }
};

onMounted(async () => {
  // Guard
  if (!authStore.isLoggedIn) {
    router.push('/login');
    return;
  }

  loading.value = true;
  professional.value = await proStore.getProfessionalById(route.params.id);
  loading.value = false;
});
</script>

<style scoped>
.shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>
