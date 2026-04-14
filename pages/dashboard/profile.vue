<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-black text-slate-900">
        Account Settings
      </h1>
      <p class="text-gray-500 text-sm">Update your personal information and profile details.</p>
    </header>

    <div class="max-w-2xl bg-white border border-gray-100 rounded-2xl p-8">
      <form @submit.prevent="handleSave" class="space-y-6">
        <!-- Success/Error Message -->
        <div v-if="message.text" :class="[
          'p-4 rounded-xl text-sm font-bold border',
          message.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
        ]">
          {{ message.text }}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Full Name -->
          <div class="space-y-2">
            <label class="text-xs font-black uppercase tracking-wider text-gray-400">Full Name</label>
            <input 
              v-model="form.fullName" 
              type="text" 
              placeholder="Your Name"
              class="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#C1ED00] outline-none transition-all font-medium"
            />
          </div>

          <!-- Phone -->
          <div class="space-y-2">
            <label class="text-xs font-black uppercase tracking-wider text-gray-400">Phone Number</label>
            <input 
              v-model="form.phone" 
              type="tel" 
              placeholder="10-digit number"
              class="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#C1ED00] outline-none transition-all font-medium"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Email (Read-only) -->
          <div class="space-y-2">
            <label class="text-xs font-black uppercase tracking-wider text-gray-400">Email Address (Read-only)</label>
            <input 
              :value="authStore.userData?.email" 
              type="email" 
              disabled
              class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-gray-400 font-medium cursor-not-allowed"
            />
          </div>

          <!-- Role (Read-only) -->
          <div class="space-y-2">
            <label class="text-xs font-black uppercase tracking-wider text-gray-400">Account Type (Read-only)</label>
            <input 
              :value="authStore.role" 
              type="text" 
              disabled
              class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-gray-400 font-medium uppercase cursor-not-allowed"
            />
          </div>
        </div>

        <div class="pt-4 border-t border-gray-50">
          <button 
            type="submit"
            :disabled="loading"
            class="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-[#C1ED00] hover:text-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {{ loading ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth';

definePageMeta({
  layout: 'dashboard'
});

const authStore = useAuthStore();
const loading = ref(false);
const message = ref({ text: '', type: '' });

const form = ref({
  fullName: '',
  phone: ''
});

// Initialize form with existing data
onMounted(() => {
  if (authStore.userData) {
    form.value.fullName = authStore.userData.fullName || '';
    form.value.phone = authStore.userData.phone || '';
  }
});

const handleSave = async () => {
  // Reset message
  message.value = { text: '', type: '' };

  // Validation
  if (!form.value.fullName.trim()) {
    message.value = { text: 'Full Name is required.', type: 'error' };
    return;
  }
  
  if (!form.value.phone.trim()) {
    message.value = { text: 'Phone Number is required.', type: 'error' };
    return;
  }

  if (form.value.phone.replace(/\D/g, '').length < 10) {
    message.value = { text: 'Phone Number must be at least 10 digits.', type: 'error' };
    return;
  }

  loading.value = true;
  try {
    await authStore.updateProfileData({
      fullName: form.value.fullName.trim(),
      phone: form.value.phone.trim()
    });
    message.value = { text: 'Profile updated successfully!', type: 'success' };
  } catch (err) {
    message.value = { text: 'Failed to update profile. Please try again.', type: 'error' };
  } finally {
    loading.value = false;
  }
};
</script>
