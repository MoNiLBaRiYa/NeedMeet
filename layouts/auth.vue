<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <!-- Back to Home Link -->
      <NuxtLink to="/" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-slate-900 mb-8 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </NuxtLink>
      
      <div class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10 border border-gray-100">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
// Auth layout for login/register
</script>
