<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-center text-3xl font-extrabold tracking-tight text-slate-900">
        Sign in to NeedMeet
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <NuxtLink to="/register" class="font-medium text-[#c1ed00] hover:text-[#9fc200] transition-colors">
          create a new account
        </NuxtLink>
      </p>
    </div>
    
    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from '../components/auth/LoginForm.vue';

definePageMeta({
  layout: 'auth',
});
</script>
