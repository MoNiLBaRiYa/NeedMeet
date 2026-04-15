<template>
  <div class="py-12">
    <div class="flex justify-between items-end mb-8">
      <div>
        <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">
          Explore Categories
        </h2>
        <p class="text-gray-500 mt-2">
          Find the right expertise for your every need

        </p>
      </div>
      <div v-if="loading" class="text-sm text-gray-400 animate-pulse">
        Loading categories...
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="p-8 text-center bg-red-50 text-red-600 rounded-3xl">
      {{ error }}
      <button @click="fetchCategories" class="block mx-auto mt-4 text-sm font-bold underline">Try again</button>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <template v-if="filteredCategories.length > 0">
        <CategoryCard
          v-for="category in filteredCategories"
          :key="category.id"
          :category="category"
        />
      </template>
      <div v-else-if="!loading" class="col-span-full py-12 text-center">
        <div class="text-4xl mb-4 text-gray-200">🔍</div>
        <h3 class="text-xl font-bold text-slate-900">No categories found</h3>
        <p class="text-gray-500">Try adjusting your search query.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
});

const categories = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchCategories = async () => {
  loading.value = true;
  error.value = null;
  try {
    categories.value = await $fetch('/mock-data/categories.json');
  } catch (err) {
    error.value = 'Failed to load categories. Please try again later.';
  } finally {
    loading.value = false;
  }
};

const filteredCategories = computed(() => {
  if (!props.searchQuery) return categories.value;
  const q = props.searchQuery.toLowerCase();
  return categories.value.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.description.toLowerCase().includes(q)
  );
});

onMounted(() => {
  fetchCategories();
});
</script>

