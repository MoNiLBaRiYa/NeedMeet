<template>
  <NuxtLink
    :to="`/subcategories/${subcategory.pageLink}`"
    class="group block p-6 bg-white border border-gray-100 rounded-[2rem] transition-all duration-300 hover:border-[#C1ED00] hover:shadow-xl hover:shadow-[#C1ED00]/10"
  >
    <div class="flex items-start gap-4">
      <div class="w-20 h-20 shrink-0 rounded-2xl bg-slate-50 overflow-hidden border border-slate-100 group-hover:border-[#C1ED00] transition-all duration-300">
        <img 
          :src="subcategory.image || '/images/default.jpg'" 
          :alt="subcategory.name"
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          @error="(e) => (e.target.src = '/images/default.jpg')"
        />
      </div>
      <div>
        <h3 class="font-bold text-slate-900 text-lg mb-1 group-hover:text-[#C1ED00] transition-colors">
         
          {{ subcategory.name }}
      </h3>
        <p class="text-gray-500 text-sm line-clamp-2 leading-relaxed">
          {{ subcategory.description || 'Explore top professionals for your needs.' }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>

defineProps({
  subcategory: {
    type: Object,
    required: true
  }
});
</script>
