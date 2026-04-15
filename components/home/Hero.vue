
<template>
  <header class="relative px-6 py-20 bg-slate-900 overflow-hidden text-center text-white rounded-b-[3rem]">
    
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute top-0 left-0 w-64 h-64 bg-[#C1ED00] rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-[#C1ED00] rounded-full blur-[150px] translate-x-1/3 translate-y-1/3"></div>
    </div>

    <div class="relative max-w-3xl mx-auto space-y-8">
      <h1 class="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        The Expert for your 
        <span class="text-[#C1ED00]">
          Every Project
        </span>
      </h1>
      <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium">
        Connecting you with the best cleaning, plumbing, tutoring, and technical professionals instantly.
      </p>

      <!-- Search Bar -->
      <div class="max-w-xl mx-auto relative group">
        <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Icon name="lucide:search" size="20" class="text-slate-400 group-focus-within:text-[#C1ED00] transition-colors" />
        </div>
        <input  type="text" v-model="query"  placeholder="Search any sub categories (e.g. plumbing, haircut)..." 
         class="w-full pl-14 pr-6 py-5 bg-white text-slate-900 rounded-2xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#C1ED00]/20 transition-all text-lg font-medium"  @input="filterSuggestions"  @blur="closeSuggestions"  @focus="filterSuggestions"/>

        <!-- Search Suggestions Dropdown -->
        <div 
          v-if="showSuggestions" 
          class="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <button v-for="sub in suggestions" :key="sub.id" @click="handleSelect(sub)" class="w-full px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left border-b last:border-none border-gray-50">
            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
               <img :src="sub.image || '/images/default.jpg'" class="w-full h-full object-cover" @error="(e) =>{
               (e.target.src = '/images/default.jpg')}"/>

            </div>
            <div>
              <p class="font-bold text-slate-900">
                {{ sub.name }}
              </p>
              <p class="text-xs text-gray-400 uppercase tracking-widest font-bold">
                In {{ sub.categoryName }}
              </p>
            </div>
          </button>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-4 text-sm text-slate-500 font-bold uppercase tracking-widest pt-4">
        <span>Quick Fix</span>
        <span class="text-slate-700">•</span>
        <span>Trusted Experts</span>
        <span class="text-slate-700">•</span>
        <span>Verified Profiles</span>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps(['search']);
const emit = defineEmits(['update:search']);

const query = ref(props.search || '');
const subcategories = ref([]);
const suggestions = ref([]);
const showSuggestions = ref(false);


//search bar subcategories find karbaa maate
const filterSuggestions = () => {
  if (!query.value) {
    suggestions.value = [];
    showSuggestions.value = false;
    return;
  }
  
  const search = query.value.toLowerCase();
  suggestions.value = subcategories.value.filter(sub =>

    sub.name.toLowerCase().includes(search)
  ).slice(0, 5);

  showSuggestions.value = suggestions.value.length > 0;
};

const handleSelect = (sub) => {
  query.value = sub.name;
  showSuggestions.value = false;
  emit('update:search', sub.name);
  navigateTo(`/subcategories/${sub.pageLink}`);
};

onMounted(async () => {
  subcategories.value = await $fetch('/mock-data/subcategories.json');
});

const closeSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
};
</script>
