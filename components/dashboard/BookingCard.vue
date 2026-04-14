<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl">
    <div>
      <h4 class="text-lg font-bold text-slate-900">{{ booking.service }}</h4>
      <p class="text-sm text-gray-500">Expert: {{ booking.professionalName }}</p>
    </div>

    <div class="flex items-center gap-8 mt-4 md:mt-0">
      <div class="text-right">
        <p class="text-sm font-bold text-slate-900">{{ booking.date }}</p>
        <p class="text-xs text-gray-400">{{ booking.time }}</p>
      </div>

      <div class="text-right min-w-[80px]">
        <p class="text-xl font-black text-slate-900">₹{{ booking.price }}</p>
        <span 
          class="inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded border mt-1"
          :class="statusClasses"
        >
          {{ booking.status }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  booking: { type: Object, required: true }
});

const statusClasses = computed(() => {
  switch (props.booking.status.toLowerCase()) {
    case 'confirmed':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'pending':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'cancelled':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
});
</script>
