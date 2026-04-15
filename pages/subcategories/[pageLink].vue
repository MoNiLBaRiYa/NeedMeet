<template>
  <div class="container mx-auto px-6 py-12">
    <!-- Error State -->
    <div v-if="error || !subcategory" class="text-center py-20 space-y-4">
      <h2 class="text-2xl font-bold text-slate-900">
        Subcategory not found
      </h2>
      <p class="text-gray-500">
    The service you're looking for doesn't exist.
        </p>
      <NuxtLink to="/" class="inline-block px-6 py-3 bg-[#C1ED00] text-slate-900 font-bold rounded-xl hover:shadow-lg transition-all">
        Back to Home
      </NuxtLink>
    </div>

    <!-- Content  -->
    <div v-else class="space-y-8">
      <header class="pb-8 border-b border-gray-100 flex items-center justify-between">
        <div>
          <NuxtLink :to="`/categories/${categoryPageLink}`" class="text-gray-400 hover:text-[#C1ED00] text-sm font-bold mb-2 inline-block transition-colors"> 
            &larr; Back to Category
          </NuxtLink>
          <div class="mt-2 mb-4">
            <h1 class="text-4xl font-black text-slate-900 tracking-tight">
              {{ subcategory.name }}
            </h1>
          </div>
          <p class="text-lg text-gray-500 max-w-2xl leading-relaxed">
            {{ subcategory.description }}
          </p>
        </div>
      </header>

      <!-- Result -->
      <section>
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 py-6 border-y border-gray-100">
          <h2 class="text-xl font-bold text-slate-900">
            {{ sortedProfessionals.length }}
             Professionals Available
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
          <ProfessionalCard  v-for="prof in sortedProfessionals"  :key="prof.id" :professional="prof" />
        </div>
        
        <div v-else class="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
          <p class="text-gray-400 font-medium text-lg">No professionals available in this category yet.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
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
  if (sortBy.value === 'price-low') return result.sort((a, b) => a.pricing.base - b.pricing.base);
  if (sortBy.value === 'price-high') return result.sort((a, b) => b.pricing.base - a.pricing.base);
  if (sortBy.value === 'rating') return result.sort((a, b) => b.rating - a.rating);
  return result;
});

const loadData = async () => {
  loading.value = true;
  try {
    const allSubcategories = await $fetch('/mock-data/subcategories.json');
    subcategory.value = allSubcategories.find(s => s.pageLink === pageLink);

    if (subcategory.value) {
      const allCategories = await $fetch('/mock-data/categories.json');
      const parentCat = allCategories.find(c => c.id === subcategory.value.categoryId);
      if (parentCat) categoryPageLink.value = parentCat.pageLink;

      const allProfessionals = await $fetch('/mock-data/professionals.json');
      professionals.value = allProfessionals.filter(p => p.subcategoryId === subcategory.value.id);
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData();
});
</script>

