import { useAuthStore } from '~/stores/auth';
//hu jyaare refresh karis tyare automatically login thai jase mane vaare kvaare karva ni jarur nathi 
export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const authStore = useAuthStore(nuxtApp.$pinia);
    authStore.initAuth();
  }
});
