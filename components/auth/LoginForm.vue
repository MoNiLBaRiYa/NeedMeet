<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">

    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
      <div class="mt-1">
        <input id="email" v-model="form.email" type="email" required @input="validateEmail"
          :class="[ 'block w-full appearance-none rounded-md border px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm transition-colors',
            emailError ? 'border-red-400 focus:border-red-400' : 'border-gray-300 focus:border-[#C1ED00] focus:ring-[#C1ED00]'
          ]" placeholder="you@example.com"/>

      </div>
      <p v-if="emailError" class="mt-1 text-xs text-red-500 font-medium">
        {{ emailError }}
      </p>
    </div>

    <!-- Password -->
    <div>
      <div class="flex items-center justify-between">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <a href="#" class="text-sm font-medium text-slate-800 hover:text-[#C1ED00] transition-colors">Forgot your password?</a>
      </div>
      <div class="mt-1">
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-[#C1ED00] focus:outline-none focus:ring-[#C1ED00] sm:text-sm transition-colors"
        />
      </div>
      <p v-if="form.password && form.password.length < 6" class="mt-1 text-xs text-orange-500 font-medium">
        Password must be at least 6 characters.
      </p>
    </div>

    <!-- Error -->
    <div v-if="error" class="rounded-xl bg-red-50 border border-red-100 p-4">
      <p class="text-sm font-bold text-red-800">{{ error }}</p>
    </div>

    <!-- Submit -->
    <div>
      <button
        type="submit"
        :disabled="loading"
        class="flex w-full justify-center rounded-xl border border-transparent bg-slate-900 py-3.5 px-4 text-sm font-black text-white shadow-xl hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C1ED00] focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
      >
        <div v-if="loading" class="flex items-center gap-2">
          <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Signing in...</span>
        </div>
        <span v-else>Sign in</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const form = reactive({ email: '', password: '' });
const loading = ref(false);
const error = ref(null);
const emailError = ref('');

// Email validation
const validateEmail = () => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  emailError.value = form.email && !re.test(form.email) ? 'Please enter a valid email address.' : '';
};

const handleSubmit = async () => {
  validateEmail();
  if (emailError.value) return;

  loading.value = true;
  error.value = null;
  try {
    
    await authStore.login(form.email, form.password);
    router.push('/');

  } catch (err) {
    error.value = err.message || 'An error occurred during sign in.';

  } finally {
    loading.value = false;
  }
};
</script>
