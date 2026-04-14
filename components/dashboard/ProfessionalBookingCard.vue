<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl">
    <div>
      <h4 class="text-lg font-bold text-slate-900">{{ booking.service }}</h4>
      <p class="text-sm text-gray-500">Client: {{ booking.customerName || 'Customer' }}</p>
    </div>

    <div class="flex items-center gap-8 mt-4 md:mt-0">
      <div class="text-right">
        <p class="text-sm font-bold text-slate-900">{{ booking.date }}</p>
        <p class="text-xs text-gray-400">{{ booking.time }}</p>
      </div>

      <div class="text-right min-w-[120px]">
        <div v-if="booking.status === 'pending'" class="flex gap-2">
          <button 
            @click="$emit('accept', booking.id)"
            class="px-3 py-1 bg-green-600 text-white text-[10px] font-bold uppercase rounded hover:bg-green-700 transition-colors"
          >
            Accept
          </button>
          <button 
            @click="$emit('reject', booking.id)"
            class="px-3 py-1 bg-white text-gray-400 text-[10px] font-bold uppercase rounded border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            Reject
          </button>
        </div>
        <div v-else>
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
  </div>
</template>

<script setup>
const props = defineProps({
  booking: { type: Object, required: true }
});

defineEmits(['accept', 'reject']);

const statusClasses = computed(() => {
  switch (props.booking.status.toLowerCase()) {
    case 'confirmed':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'pending':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'rejected':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
});
</script>
