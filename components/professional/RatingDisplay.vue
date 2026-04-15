<template>
  <div class="flex items-center gap-1.5">
    <!-- Star Icons -->
    <div class="flex items-center gap-0.5">
      <span v-for="i in 5" :key="i" :class="['text-lg', i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200']">
        ★
      </span>
    </div>
    <!-- Detailed Text -->
    <div v-if="showDetailed" class="flex items-center gap-2 text-sm">
      <span class="font-black text-slate-900">
        {{ rating }}
      </span>
      <span class="text-gray-400">
        ({{ count }} reviews)
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  rating: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  showDetailed: {
    type: Boolean,
    default: false
  }
});
</script>
