<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Topbar (Reuse Navbar but simplified) -->
    <nav class="bg-white border-b border-gray-200 py-3 px-6 h-16 flex items-center justify-between sticky top-0 z-40">
      <NuxtLink to="/" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-[#C1ED00] rounded-lg flex items-center justify-center font-black text-slate-900">N</div>
        <span class="font-bold text-slate-900">NeedMeet</span>
      </NuxtLink>
      <div class="flex items-center gap-3">
        <span class="px-2.5 py-1 text-xs font-black uppercase tracking-widest bg-[#C1ED00]/20 text-slate-700 rounded-lg">
          {{ authStore.role }}
        </span>
        <span class="text-sm font-bold text-slate-900">
          {{ authStore.fullName || authStore.user?.displayName || authStore.user?.email?.split('@')[0] || 'User' }}
        </span>
      </div>
    </nav>

    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r border-gray-200 flex flex-col hidden lg:flex sticky top-16 h-[calc(100vh-64px)]">
        <div class="p-6 space-y-1">
          <NuxtLink 
            to="/dashboard" 
            class="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors"
            active-class="bg-[#C1ED00]/10 text-slate-900"
            exact-active-class="bg-[#C1ED00] text-slate-900 shadow-sm"
          >
            Overview
          </NuxtLink>

          <NuxtLink 
            to="/profile" 
            class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:text-slate-900 hover:bg-gray-50 rounded-xl transition-colors"
            active-class="bg-[#C1ED00] text-slate-900 shadow-sm"
          >
            Account
          </NuxtLink>

          <NuxtLink 
            to="/BrowseProfessionals" 
            class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:text-slate-900 hover:bg-gray-50 rounded-xl transition-colors"
            active-class="bg-[#C1ED00] text-slate-900 shadow-sm"
          >
            Browse Professionals
          </NuxtLink>
        </div>

        <div class="mt-auto p-6 border-t border-gray-100">
          <button 
            @click="handleLogout"
            class="w-full text-left flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            Log Out
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-8 overflow-y-auto">
        <div class="max-w-5xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await authStore.logout();
  router.push('/');
};
</script>
