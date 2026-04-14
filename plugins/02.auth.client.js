import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const authStore = useAuthStore(nuxtApp.$pinia);
    authStore.initAuth();
  }
});
