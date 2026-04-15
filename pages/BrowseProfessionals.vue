<template>
  <div class="container mx-auto px-6 py-12">
    <!-- Header -->
    <div class="max-w-4xl mx-auto mb-16 text-center">
      <h1 class="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
        Browse All <span class="text-[#C1ED00]">Experts</span>
      </h1>
      <p class="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
        Discover top-rated professionals across all categories. Filter, sort, and find the perfect match for your needs.
      </p>
    </div>

   
    <div class="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 py-6 border-y border-gray-100">
      <h2 class="text-xl font-bold text-slate-900">
        {{ sortedProfessionals.length }} Professionals Found
      </h2>
      
      <div class="flex items-center gap-4">
        <label for="sort" class="text-sm font-bold text-gray-400 uppercase tracking-wider">Sort by:</label>
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

    <!-- Results -->
    <div v-if="sortedProfessionals.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ProfessionalCard 
        v-for="prof in sortedProfessionals" 
        :key="prof.id" 
        :professional="prof" 
      />
    </div>

    <div v-else class="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
      <p class="text-gray-400 font-medium text-lg">
        No professionals found. Try adjusting your filters.
      </p>
    </div>
  </div>
</template>

<script setup>
const professionals = ref([]);
const loading = ref(true);
const sortBy = ref('recommended');

const sortedProfessionals = computed(() => {
  const result = [...professionals.value];
  if (sortBy.value === 'price-low') return result.sort((a, b) =>
  { a.pricing.base - b.pricing.base

  });
  if (sortBy.value === 'price-high') return result.sort((a, b) =>{
    b.pricing.base - a.pricing.base
  });
  if (sortBy.value === 'rating') return result.sort((a, b) => {
    b.rating - a.rating
  });
  return result;
});

onMounted(async () => {
  try {
    professionals.value = await $fetch('/mock-data/professionals.json');
  } finally {
    loading.value = false;
  }
});

</script>

