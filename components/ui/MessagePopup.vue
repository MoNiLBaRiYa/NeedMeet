<template>
  <div class="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 space-y-3 pointer-events-none">
    <TransitionGroup 
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-for="pop in popups" 
        :key="pop.id"
        :class="[
          'pointer-events-auto p-4 rounded-2xl shadow-2xl border flex items-center justify-between gap-4 backdrop-blur-md',
          pop.type === 'success' ? 'bg-[#C1ED00] border-[#A8CC00] text-slate-900' : 'bg-red-500 border-red-600 text-white'
        ]"
      >
        <div class="flex items-center gap-3">
          <div v-if="pop.type === 'success'" class="w-6 h-6 rounded-full bg-slate-900 text-[#C1ED00] flex items-center justify-center">
            <Icon name="heroicons:check-16-solid" size="14" />
          </div>
          <p class="text-sm font-black">{{ pop.message }}</p>
        </div>
        <button @click="removePopup(pop.id)" class="opacity-50 hover:opacity-100 transition-opacity">
          <Icon name="heroicons:x-mark-16-solid" size="16" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
const { popups, removePopup } = useMessagePopup();
</script>
