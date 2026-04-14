<template>
  <div class="container mx-auto px-6 py-12">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-20">
      <p class="text-lg font-medium text-gray-500 animate-pulse">Loading professionals...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !subcategory" class="text-center py-20 space-y-4">
      <div class="text-5xl">😕</div>
      <h2 class="text-2xl font-bold text-slate-900">Subcategory not found</h2>
      <p class="text-gray-500">The service you're looking for doesn't exist.</p>
      <NuxtLink to="/" class="inline-block px-6 py-3 bg-[#C1ED00] text-slate-900 font-bold rounded-xl hover:shadow-lg transition-all">
        Back to Home
      </NuxtLink>
    </div>

    <!-- Content State -->
    <div v-else class="space-y-8">
      <!-- Header -->
      <header class="pb-8 border-b border-gray-100 flex items-center justify-between">
        <div>
          <NuxtLink :to="`/categories/${categoryPageLink}`" class="text-gray-400 hover:text-[#C1ED00] text-sm font-bold mb-2 inline-block transition-colors">
            &larr; Back to Category
          </NuxtLink>
          <div class="flex items-center gap-4 mt-2 mb-4">
            <div class="p-3 bg-slate-900 rounded-2xl text-[#C1ED00]">
              <CommonIcon :name="subcategory.icon || 'sparkles'" />
            </div>
            <h1 class="text-4xl font-black text-slate-900 tracking-tight">{{ subcategory.name }}</h1>
          </div>
          <p class="text-lg text-gray-500 max-w-2xl leading-relaxed">{{ subcategory.description }}</p>
        </div>
      </header>

      <!-- Results Grid -->
      <section>
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 py-6 border-y border-gray-100">
          <h2 class="text-xl font-bold text-slate-900">
            {{ sortedProfessionals.length }} Professionals Available
          </h2>
          
          <div class="flex items-center gap-4">
            <label for="sort" class="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Sort by:</label>
            <select 
              id="sort" 
              v-model="sortBy"
              class="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#C1ED00] transition-all cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div v-if="sortedProfessionals.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProfessionalCard 
            v-for="prof in sortedProfessionals" 
            :key="prof.id" 
            :professional="prof" 
          />
        </div>
        
        <div v-else class="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
          <p class="text-gray-400 font-medium text-lg">No professionals available in this category yet.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { mockApi } from '../../utils/mockApi';

const route = useRoute();
const pageLink = route.params.pageLink;

const subcategory = ref(null);
const categoryPageLink = ref('');
const professionals = ref([]);
const loading = ref(true);
const error = ref(null);
const sortBy = ref('recommended');

const sortedProfessionals = computed(() => {
  const result = [...professionals.value];
  
  if (sortBy.value === 'price-low') {
    return result.sort((a, b) => a.pricing.base - b.pricing.base);
  } else if (sortBy.value === 'price-high') {
    return result.sort((a, b) => b.pricing.base - a.pricing.base);
  } else if (sortBy.value === 'rating') {
    return result.sort((a, b) => b.rating - a.rating);
  }
  
  return result;
});

const loadData = async () => {
  loading.value = true;
  try {
    const allSubcategories = await mockApi.getSubcategories();
    subcategory.value = allSubcategories.find(s => s.pageLink === pageLink);

    if (subcategory.value) {
      // Find the parent category pageLink for the back button
      const allCategories = await mockApi.getCategories();
      const parentCat = allCategories.find(c => c.id === subcategory.value.categoryId);
      if (parentCat) categoryPageLink.value = parentCat.pageLink;

      // Fetch professionals
      professionals.value = await mockApi.getProfessionals(subcategory.value.id);
    }
  } catch (err) {
    console.error('Failed to load subcategory data:', err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData();
});
</script>
