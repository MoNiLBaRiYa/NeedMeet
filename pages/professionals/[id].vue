<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header Hero -->
    <section class="bg-slate-900 pt-12 pb-32 px-6 rounded-b-[4rem]">
      <div class="container mx-auto max-w-5xl">
        <NuxtLink to="/" class="inline-flex items-center text-slate-400 hover:text-[#C1ED00] mb-12 transition-colors font-bold text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
          </svg>
          Back to browsing
        </NuxtLink>

        <!-- Profile card -->
        <div v-if="professional" class="flex flex-col md:flex-row gap-12 items-start">
          <div class="w-48 h-48 flex-shrink-0 bg-white rounded-[2.5rem] overflow-hidden border-4 border-[#C1ED00] shadow-2xl">
            <img :src="professional.image || '/images/default.jpg'" :alt="professional.fullName" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 space-y-6">
            <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight">{{ professional.fullName }}</h1>
            <div class="flex items-center gap-4">
              <ProfessionalRatingDisplay :rating="professional.rating" :count="professional.reviewCount" :show-detailed="true" class="text-white" />
              <span class="px-3 py-1 bg-[#C1ED00]/10 text-[#C1ED00] text-xs font-black uppercase rounded-lg border border-[#C1ED00]/30">Verified Pro</span>
            </div>
            <p class="text-xl text-slate-400 leading-relaxed font-medium">
              {{ professional.bio }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main -->
    <main class="container mx-auto max-w-5xl px-6 -mt-16 pb-24">
      <div v-if="professional" class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!--sidebar-->
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-gray-100 sticky top-24">
            <div class="mb-8">
              <span class="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">Service pricing</span>
              <p class="text-4xl font-black text-slate-900 border-l-4 border-[#C1ED00] pl-4">
                ₹{{ professional.pricing.base }} <span class="text-lg text-gray-400">/ {{ professional.pricing.unit }}</span>
              </p>
            </div>
            
            <button 
              class="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-[#C1ED00] hover:text-slate-900 transition-all shadow-lg active:scale-95 text-lg"
              @click="handleBooking"
            >
              Book Now
            </button>
            <p class="text-center text-xs text-gray-400 mt-4 font-bold">Safe and Secure Payment through NeedMeet</p>
          </div>
        </div>

        <!-- Main Info -->
        <div class="lg:col-span-2 space-y-16 py-8">
          <!-- Services Section -->
          <section>
            <h3 class="text-2xl font-black text-slate-900 mb-8">Services Offered</h3>
            <div class="grid gap-4">
              <div 
                v-for="service in professional.services" 
                :key="service.id" 
                class="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl hover:border-[#C1ED00] transition-colors"
              >
                <div>
                  <h4 class="font-bold text-slate-900">{{ service.name }}</h4>
                  <p class="text-sm text-gray-400">Professional execution guaranteed.</p>
                </div>
                <span class="text-xl font-black text-slate-900">₹{{ service.price }}</span>
              </div>
            </div>
          </section>

          <!-- Reviews Section -->
          <ProfessionalReviewList :professional-id="professional.id" />
        </div>
      </div>

      <!-- Not Found State -->
      <div v-if="!professional" class="text-center py-32 space-y-8 bg-white rounded-[3rem] border border-gray-100 shadow-xl">
        <div class="text-7xl">🤔</div>
        <h2 class="text-3xl font-black text-slate-900">Professional Not Found</h2>
        <p class="text-gray-500 max-w-sm mx-auto">The expert you're looking for might have moved or is currently unavailable.</p>
        <NuxtLink to="/" class="inline-block px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-[#C1ED00] hover:text-slate-900 transition-all">
          Back to browsing
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

const professional = ref(null);
const loading = ref(true);

const fetchPro = async () => {
  loading.value = true;
  const allProfessionals = await $fetch('/mock-data/professionals.json');
  professional.value = allProfessionals.find(p => p.id === route.params.id) || null;
  loading.value = false;
};

const handleBooking = () => {
  const authStore = useAuthStore();
  if (!authStore.isLoggedIn) {
    router.push('/login');
    return;
  }
  router.push(`/booking/${professional.value.id}`);
};

onMounted(() => {
  fetchPro();
});

useHead({
  title: professional.value ? `${professional.value.fullName} - NeedMeet` : 'Professional Profile'
});
</script>

