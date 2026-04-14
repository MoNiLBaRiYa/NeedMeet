<template>
  <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
    <div class="container mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div class="w-10 h-10 bg-[#C1ED00] rounded-xl flex items-center justify-center font-black text-slate-900 group-hover:rotate-6 transition-transform">
          N
        </div>
        <span class="text-xl font-bold tracking-tight text-slate-900">NeedMeet</span>
      </NuxtLink>

      <!-- Navigation Links -->
      <div class="hidden md:flex items-center gap-8">
        <NuxtLink 
          to="/" 
          class="text-sm font-medium transition-colors hover:text-[#A8CC00]"
          active-class="text-[#C1ED00]"
          exact-active-class="text-[#A8CC00]"
        >
          Home
        </NuxtLink>
        <NuxtLink 
          to="/explore" 
          class="text-sm font-medium transition-colors hover:text-[#A8CC00]"
          active-class="text-[#A8CC00]"
        >
          Browse Professionals
        </NuxtLink>
      </div>

      <!-- Auth Action Buttons -->
      <div class="flex items-center gap-4">
        <template v-if="!authStore.isLoggedIn">
          <NuxtLink 
            to="/login" 
            class="hidden sm:block text-sm font-semibold text-gray-600 hover:text-slate-900 transition-colors"
          >
            Log In
          </NuxtLink>
          <NuxtLink 
            to="/register" 
            class="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-slate-200"
          >
            Get Started
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink 
            to="/dashboard" 
            class="px-5 py-2.5 bg-gray-100 text-slate-900 text-sm font-bold rounded-xl hover:bg-gray-200 transition-all"
            active-class="bg-[#C1ED00] text-slate-900"
          >
            Dashboard
          </NuxtLink>
          <button 
            @click="handleLogout"
            class="text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors"
          >
            Logout
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

<style scoped>
.router-link-active {
  font-weight: 700;
}
</style>
