<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <RoleSelector v-model="form.role" />

    <!-- Full Name -->
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Full name</label>
      <div class="mt-1">
        <input id="name" v-model="form.name" type="text" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-[#C1ED00] focus:outline-none focus:ring-[#C1ED00] sm:text-sm transition-colors" placeholder="Monil"/>
      </div>
    </div>

    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
      <div class="mt-1">
        <input id="email" v-model="form.email" type="email" required @input="validateEmail"
          :class="[
            'block w-full appearance-none rounded-md border px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm transition-colors',
            emailError ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-300 focus:border-[#C1ED00] focus:ring-[#C1ED00]'
          ]" placeholder="you@example.com"/>
      </div>
      <p v-if="emailError" class="mt-1 text-xs text-red-500 font-medium">{{ emailError }}</p>
    </div>

    <!-- Password -->
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <div class="mt-1">
        <input id="password" v-model="form.password" type="password" required
   @input="checkStrength"
          class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-[#C1ED00] focus:outline-none focus:ring-[#C1ED00] sm:text-sm transition-colors"
          placeholder="Min. 6 characters"/>

      </div>

      <!-- Password Strength Bar -->
      <div v-if="form.password" class="mt-2 space-y-1">
        <div class="flex gap-1">
          <div v-for="i in 4" :key="i" :class="[ 'h-1 flex-1 rounded-full transition-all', i <= passwordStrength.score ? passwordStrength.barColor : 'bg-gray-200']">


          </div>
        </div>
        <p :class="['text-xs font-bold', passwordStrength.textColor]">
          {{ passwordStrength.label }}
          <span v-if="passwordStrength.hint" class="font-normal text-gray-400">
             {{ passwordStrength.hint }}
            
            </span>
        </p>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="rounded-xl bg-red-50 border border-red-100 p-4">
      <p class="text-sm font-bold text-red-800">
        {{ error }}
      </p>
    </div>

    <!-- Submit -->
    <div>
      <button type="submit" :disabled="loading"
        class="flex w-full justify-center rounded-md border border-transparent bg-slate-900 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C1ED00] focus:ring-offset-2 disabled:bg-slate-400 transition-colors">
        <span v-if="loading">
          Creating account
        </span>
        <span v-else>

          Register as a {{ form.role === 'professional' ? 'Professional' : 'Customer' }}
        </span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';
import RoleSelector from './RoleSelector.vue';

const authStore = useAuthStore();
const router = useRouter();

const form = reactive({ name: '', email: '', password: '', role: 'customer' });
const loading = ref(false);
const error = ref(null);
const emailError = ref('');
const passwordStrength = ref({ score: 0, label: '', textColor: '', barColor: '', hint: '' });

// Email validation
const validateEmail = () => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  emailError.value = form.email && !re.test(form.email) ? 'Please enter a valid email address.' : '';
};

// Password strength check
const checkStrength = () => {
  const p = form.password;
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;

  const levels = [
    { label: 'Very Weak', textColor: 'text-red-500',    barColor: 'bg-red-500',    hint: 'Use 8+ characters' },
    { label: 'Weak',      textColor: 'text-orange-500', barColor: 'bg-orange-400', hint: 'Add uppercase letters' },
    { label: 'Medium',    textColor: 'text-yellow-600', barColor: 'bg-yellow-400', hint: 'Add a number' },
    { label: 'Strong',    textColor: 'text-blue-500',   barColor: 'bg-blue-500',   hint: 'Add a symbol' },
    { label: 'Excellent', textColor: 'text-green-600',  barColor: 'bg-green-500',  hint: '' },
  ];

  passwordStrength.value = { score, ...levels[score] };
};

const handleSubmit = async () => {
  validateEmail();
  if (emailError.value) return;

  loading.value = true;
  error.value = null;
  try {
    await authStore.register(form.email, form.password, form.role);
    router.push('/');
  } catch (err) {
    error.value = err.message || 'An error occurred during registration.';
  } finally {
    loading.value = false;
  }
};
</script>
