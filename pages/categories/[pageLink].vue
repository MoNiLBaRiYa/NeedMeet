<template>
  <div class="container mx-auto px-6 py-12">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-20">
      <p class="text-lg font-medium text-gray-500 animate-pulse">Loading...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !category" class="text-center py-20 space-y-4">

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
        <div class="flex items-center gap-4 mb-4">
          <div class="p-3 bg-slate-900 rounded-2xl text-[#C1ED00]">
            <CommonIcon :name="category.icon" />
          </div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight">{{ category.name }}</h1>
        </div>
        <p class="text-lg text-gray-500 max-w-2xl leading-relaxed">{{ category.description || 'Explore subcategories below.' }}</p>
      </header>

      <!-- Results Grid -->
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
            
            No services found in this category yet.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { mockApi } from '../../utils/mockApi';

const route = useRoute();
const pageLink = route.params.pageLink;

const category = ref(null);
const subcategories = ref([]);
const loading = ref(true);
const error = ref(null);

const loadData = async () => {
  loading.value = true;
  try {
    const allCategories = await mockApi.getCategories();
    category.value = allCategories.find(c => c.pageLink === pageLink);

    if (category.value) {
      subcategories.value = await mockApi.getSubcategories(category.value.id);
    }


  } catch (err) {
    console.error('Failed to load category data:', err);
    error.value = err.message;
  } 
  finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData();
});
</script>
