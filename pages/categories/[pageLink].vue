<template>
  <div class="container mx-auto px-6 py-12">
    <!-- Error State -->
    <div v-if="error || !category" class="text-center py-20 space-y-4">

      <h2 class="text-2xl font-bold text-slate-900">Category not found</h2>
      <p class="text-gray-500">
        The service category you're looking for doesn't exist.
      </p>
      <NuxtLink to="/" class="inline-block px-6 py-3 bg-[#C1ED00] text-slate-900 font-bold rounded-xl hover:shadow-lg transition-all">
        Back to Home
      </NuxtLink>
    </div>

    <div v-else class="space-y-8">
      <header class="pb-8 border-b border-gray-100">
        <div class="mb-4">
          <h1 class="text-4xl font-black text-slate-900 tracking-tight">
            {{ category.name }}
          </h1>
        </div>

        <p class="text-lg text-gray-500 max-w-2xl leading-relaxed">
          {{ category.description || 'Explore subcategories below.' }}
        </p>
      </header>

      <!-- Result -->
      <section>
             <div class="flex items-center justify-between mb-8">
          <h2 class="text-xl font-bold text-slate-900">
            {{ subcategories.length }}
             Services Available
            </h2>
        </div>

        <div v-if="subcategories.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CategorySubcategoryCard  v-for="sub in subcategories"  :key="sub.id"  :subcategory="sub" />
        </div>
        
        <div v-else class="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
          <p class="text-gray-400 font-medium">
            
            No services found in this category</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const pageLink = route.params.pageLink;

const category = ref(null);
const subcategories = ref([]);
const loading = ref(true);
const error = ref(null);

const loadData = async () => {
  loading.value = true;
  try {
    const allCategories = await $fetch('/mock-data/categories.json');
    category.value = allCategories.find(c => c.pageLink === pageLink);

    if (category.value) {
      const allSubcategories = await $fetch('/mock-data/subcategories.json');
      subcategories.value = allSubcategories.filter(s => s.categoryId === category.value.id);
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

