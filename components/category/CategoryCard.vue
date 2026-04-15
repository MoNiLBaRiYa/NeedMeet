<template>
  <NuxtLink
    :to="`/categories/${category.pageLink}`"
    class="group block p-6 bg-white border border-gray-100 rounded-2xl transition-all duration-200 hover:border-[#C1ED00] hover:shadow-lg hover:shadow-[#C1ED00]/10"
  >
    <div class="flex items-start gap-4">
      <div class="w-16 h-16 shrink-0 rounded-2xl bg-slate-50 overflow-hidden border border-slate-100 group-hover:border-[#C1ED00]/30 transition-all">
        <img 
          :src="category.image || '/images/default.jpg'" 
          :alt="category.name"
          loading="lazy"
          class="w-full h-full object-cover"
          @error="(e) => (e.target.src = '/images/default.jpg')"
        />
      </div>
      <div>
        <h3 class="text-lg font-bold text-slate-900 mb-1 group-hover:text-slate-900 transition-colors">
          {{ category.name }}
        </h3>
        <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {{ category.description }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>

defineProps({
  category: {
    type: Object,
    required: true
  }
});
</script>
