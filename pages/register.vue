<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-center text-3xl font-extrabold tracking-tight text-slate-900">
        Join NeedMeet
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Already have an account?
        <NuxtLink to="/login" class="font-medium text-[#c1ed00] hover:text-[#9fc200] transition-colors">
          Sign in here
        </NuxtLink>
      </p>
    </div>
    
    <RegisterForm />
  </div>
</template>

<script setup>
import RegisterForm from '../components/auth/RegisterForm.vue';

definePageMeta({
  layout: 'auth',
});
</script>
