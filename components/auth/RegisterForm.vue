<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <RoleSelector v-model="form.role" />

    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Full name</label>
      <div class="mt-1">
        <input 
          id="name" 
          v-model="form.name" 
          type="text" 
          required 
          class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-[#C1ED00] focus:outline-none focus:ring-[#C1ED00] sm:text-sm transition-colors"
          placeholder="Jane Doe"
        />
      </div>
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
      <div class="mt-1">
        <input 
          id="email" 
          v-model="form.email" 
          type="email" 
          required 
          class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-[#C1ED00] focus:outline-none focus:ring-[#C1ED00] sm:text-sm transition-colors"
          placeholder="you@example.com"
        />
      </div>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Password (min 6 chars)</label>
      <div class="mt-1">
        <input 
          id="password" 
          v-model="form.password" 
          type="password" 
          required 
          minlength="6"
          class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-[#C1ED00] focus:outline-none focus:ring-[#C1ED00] sm:text-sm transition-colors" 
        />
      </div>
    </div>

    <div v-if="error" class="rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Registration error</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ error }}</p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <button 
        type="submit" 
        :disabled="loading"
        class="flex w-full justify-center rounded-md border border-transparent bg-slate-900 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C1ED00] focus:ring-offset-2 disabled:bg-slate-400 transition-colors"
      >
        <span v-if="loading">Creating account...</span>
        <span v-else>Register as a {{ form.role === 'professional' ? 'Professional' : 'Customer' }}</span>
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

const form = reactive({
  name: '',
  email: '',
  password: '',
  role: 'customer' // default
});

const loading = ref(false);
const error = ref(null);

const handleSubmit = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // Note: 'name' can be stored in firestore later, currently we just need email, password, and role based on requirements
    await authStore.register(form.email, form.password, form.role);
    router.push('/');
  } catch (err) {
    error.value = err.message || 'An error occurred during registration.';
  } finally {
    loading.value = false;
  }
};
</script>
