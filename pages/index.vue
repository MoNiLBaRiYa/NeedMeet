<template>
  <div class="space-y-4">
    <HomeHero v-model:search="searchQuery" />
    
    <div class="container mx-auto px-6 pb-20">
      <CategoryGrid :search-query="searchQuery" />
      
      <!-- Call to Action Section  -->
      <section class="mt-12 p-12 bg-gray-100 rounded-[3rem] text-center border border-gray-100">
        <h2 class="text-3xl font-black text-slate-900 mb-4">Want to Join as a Professional?</h2>
        <p class="text-gray-500 max-w-xl mx-auto mb-8">
          Register your business and start getting leads from verified customers in your area.
        </p>
        <NuxtLink 
          to="/register" 
          class="inline-block px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all hover:shadow-xl"
        >
          Become a Professional
        </NuxtLink>
      </section>
    </div>
  </div>
</template>

<script setup>
const searchQuery = ref('');


useHead({
  title: 'NeedMeet - Services at your doorstep',
  meta: [
    { name: 'description', content: 'On-demand professional services for cleaning, plumbing, tutoring, and more.' }
  ]
});
</script>
