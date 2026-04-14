<template>
  <div class="container mx-auto px-6 py-12">
    <div class="max-w-4xl mx-auto mb-16 text-center">
      <h1 class="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
        Explore Our <span class="text-[#C1ED00]">Full Directory</span>
      </h1>
      <p class="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
        Browse through our comprehensive list of service categories and find the right expert for your next project.
      </p>
    </div>

    <!-- Category Sections -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in 6" :key="i" class="h-64 bg-gray-50 rounded-3xl animate-pulse"></div>
    </div>

    <div v-else class="space-y-16">
      <section v-for="category in categories" :key="category.id" class="space-y-8">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
             <img :src="resolveImagePath(category.image)" class="w-6 h-6 object-contain" @error="(e) => (e.target.src = '/images/default.jpg')"/>
          </div>
          <h2 class="text-2xl font-black text-slate-900 tracking-tight">{{ category.name }}</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink 
            v-for="sub in getSubcategories(category.id)" 
            :key="sub.id"
            :to="`/subcategories/${sub.pageLink}`"
            class="group p-6 bg-white border border-gray-100 rounded-2xl transition-all duration-300 hover:border-[#C1ED00] hover:shadow-xl hover:shadow-[#C1ED00]/10"
          >
            <div class="w-12 h-12 mb-4 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden transition-all group-hover:bg-[#C1ED00]/10">
               <img :src="resolveImagePath(sub.image)" class="w-8 h-8 object-cover group-hover:scale-110 transition-transform" @error="(e) => (e.target.src = '/images/default.jpg')"/>
            </div>
            <h3 class="font-bold text-slate-900 group-hover:text-slate-900 transition-colors">{{ sub.name }}</h3>
            <p class="text-sm text-gray-400 mt-1">Found in {{ category.name }}</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { mockApi } from '../../utils/mockApi';
import { resolveImagePath } from '../../utils/pathResolver';

const categories = ref([]);
const subcategories = ref([]);
const loading = ref(true);

const getSubcategories = (catId) => {
  return subcategories.value.filter(s => s.categoryId === catId);
};

onMounted(async () => {
  try {
    const [cats, subs] = await Promise.all([
      mockApi.getCategories(),
      mockApi.getSubcategories()
    ]);
    categories.value = cats;
    subcategories.value = subs;
  } finally {
    loading.value = false;
  }
});

useHead({
  title: 'Service Categories - NeedMeet Directory',
  meta: [
    { name: 'description', content: 'Explore all professional service categories available on NeedMeet, from home repair to specialized consulting.' }
  ]
});
</script>
