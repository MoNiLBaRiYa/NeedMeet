<template>
  <div class="bg-white border border-gray-100 rounded-[2rem] p-5 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group">
    <!-- Image Header -->
    <div class="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-slate-100">
      <img 
        :src="resolveImagePath(professional.image)" 
        :alt="professional.fullName"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <!-- Rating Badge -->
      <div class="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full flex items-center gap-1.5 shadow-sm">
        <span class="text-yellow-500 font-bold text-sm">★</span>
        <span class="text-slate-900 font-black text-sm">{{ professional.rating }}</span>
      </div>
    </div>

    <!-- Info -->
    <div class="space-y-4">
      <div>
        <h3 class="text-xl font-bold text-slate-900 mb-1 tracking-tight">{{ professional.fullName }}</h3>
        <p class="text-sm font-medium text-gray-500 line-clamp-1">{{ professional.bio }}</p>
      </div>

      <div class="flex items-center justify-between pt-4 border-t border-gray-50">
        <div>
          <span class="text-[10px] uppercase tracking-widest font-black text-gray-400 block mb-0.5">Starting at</span>
          <p class="text-xl font-black text-slate-900">₹{{ professional.pricing.base }}</p>
        </div>
        
        <NuxtLink
          :to="`/professionals/${professional.id}`"
          class="px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-[#C1ED00] hover:text-slate-900 transition-all active:scale-95"
        >
          View Profile
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { resolveImagePath } from '../../utils/pathResolver';

defineProps({
  professional: {
    type: Object,
    required: true
  }
});
</script>
