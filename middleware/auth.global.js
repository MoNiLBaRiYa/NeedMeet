export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  // Protect dashboard routes : redirect to login if not authenticated
  if (to.path.startsWith('/dashboard')) {
    if (!authStore.isLoggedIn) {
      return navigateTo('/login');
    }
  }

  // Redirect authenticated users away from login or register 
  if ((to.path === '/login' || to.path === '/register') && authStore.isLoggedIn) {
    return navigateTo('/dashboard');
  }
});
