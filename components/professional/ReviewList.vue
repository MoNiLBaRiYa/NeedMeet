<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h3 class="text-2xl font-black text-slate-900">Customer Reviews</h3>
      <div v-if="loading" class="text-sm text-gray-400 animate-pulse">Loading reviews...</div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && reviews.length === 0" class="p-12 text-center bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
      <p class="text-gray-400 font-medium">No reviews yet for this professional.</p>
    </div>

    <!-- Review Items -->
    <div v-else class="space-y-6">
      <div 
        v-for="review in reviews" 
        :key="review.id"
        class="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
              {{ review.customerName.charAt(0) }}
            </div>
            <div>
              <h4 class="font-bold text-slate-900">{{ review.customerName }}</h4>
              <p class="text-[10px] text-gray-400 uppercase font-black tracking-widest">{{ formatDate(review.createdAt) }}</p>
            </div>
          </div>
          <div class="flex gap-0.5 text-yellow-400 text-sm">
            <span v-for="i in 5" :key="i">{{ i <= review.rating ? '★' : '☆' }}</span>
          </div>
        </div>
        <p class="text-gray-600 leading-relaxed italic">"{{ review.comment }}"</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { mockApi } from '~/utils/mockApi';

const props = defineProps({
  professionalId: {
    type: String,
    required: true
  }
});

const reviews = ref([]);
const loading = ref(true);

const fetchReviews = async () => {
  loading.value = true;
  try {
    reviews.value = await mockApi.getReviews(props.professionalId);
  } catch (err) {
    console.error('Failed to fetch reviews:', err);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

onMounted(() => {
  fetchReviews();
});
</script>
