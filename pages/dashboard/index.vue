<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center space-y-4">
      <div class="animate-spin w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full mx-auto"></div>
      <p class="text-gray-500 font-medium">
        Redirecting to your dashboard...
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const handleRedirect = () => {
  if (!authStore.isLoggedIn) {
     router.replace('/login');
     return;
  }

  if (authStore.role === 'professional') {
    router.replace('/dashboard/professional');
  } else {
    router.replace('/dashboard/customer');
  }
};

watch(() => authStore.initialized, (isInit) => {
  if (isInit) handleRedirect();
}, { immediate: true });

onMounted(() => {
  if (authStore.initialized) handleRedirect();
});
</script>
