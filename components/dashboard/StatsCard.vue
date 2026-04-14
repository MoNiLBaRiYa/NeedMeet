<template>
  <div class="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
    <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
      {{ title }}
    </h3>
    <p class="text-3xl font-black text-slate-900">
      <span v-if="prefix" class="text-xl align-baseline mr-0.5 text-gray-400">{{ prefix }}</span>
      {{ value }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  prefix: { type: String, default: '' }
});
</script>
