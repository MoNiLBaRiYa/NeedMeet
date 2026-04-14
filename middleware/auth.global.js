export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  
  // Only protect routes starting with /dashboard
  if (to.path.startsWith('/dashboard')) {
    if (!authStore.isLoggedIn) {
      return navigateTo('/login');
    }
  }

  // Redirect logged-in users away from login/register
  if ((to.path === '/login' || to.path === '/register') && authStore.isLoggedIn) {
    return navigateTo('/dashboard');
  }
});
