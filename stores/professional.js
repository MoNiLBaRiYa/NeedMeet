import { defineStore } from 'pinia';

export const useProfessionalStore = defineStore('professional', () => {
  const professionals = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchProfessionals(subcategoryId = null) {
    loading.value = true;
    error.value = null;
    try {
      const allProfessionals = await $fetch('/mock-data/professionals.json');
      if (subcategoryId) {
        professionals.value = allProfessionals.filter(p => p.subcategoryId === subcategoryId);
      } else {
        professionals.value = allProfessionals;
      }
    } catch (err) {
      error.value = 'Failed to load professionals.';
    } finally {
      loading.value = false;
    }
  }

  async function getProfessionalById(id) {
    loading.value = true;
    error.value = null;
    try {
      const existing = professionals.value.find(p => p.id === id);
      if (existing) return existing;
      const allProfessionals = await $fetch('/mock-data/professionals.json');
      return allProfessionals.find(p => p.id === id) || null;
    } catch (err) {
      error.value = 'Failed to load professional details.';
      return null;
    } finally {
      loading.value = false;
    }
  }

  return {
    professionals,
    loading,
    error,
    fetchProfessionals,
    getProfessionalById
  };
});
