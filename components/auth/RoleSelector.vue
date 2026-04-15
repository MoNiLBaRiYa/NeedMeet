<template>
  <div class="flex flex-col gap-3">
    <label class="text-sm font-medium text-gray-700">
      Select a rolee
    </label>
    <div class="grid grid-cols-2 gap-4">
      <!-- Role Option -->
      <label 
        class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none transition-all"
        :class="modelValue === 'customer' ? 'border-[#C1ED00] ring-1 ring-[#C1ED00]' : 'border-gray-300'">
        <input type="radio" name="role"  value="customer"  class="sr-only"  :checked="modelValue === 'customer'" @change="$emit('update:modelValue', 'customer')" />
        <div class="flex flex-1">
          <div class="flex flex-col">
            <span class="block text-sm font-medium text-gray-900">
              Customer
            </span>
            <span class="mt-1 flex items-center text-sm text-gray-500">
              I want to book an professional.
            </span>
          </div>
        </div>
      </label>

      <!-- Professional Option -->
      <label 
        class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none transition-all"
        :class="modelValue === 'professional' ? 'border-[#C1ED00] ring-1 ring-[#C1ED00]' : 'border-gray-300'">

        <input  type="radio"  name="role"  value="professional"  class="sr-only"  :checked="modelValue === 'professional'" @change="$emit('update:modelValue', 'professional')" />

        <div class="flex flex-1">
          <div class="flex flex-col">
            <span class="block text-sm font-medium text-gray-900">
              Professional
            </span>
            <span class="mt-1 flex items-center text-sm text-gray-500">

              I want to offer my services.
            </span>
          </div>
        </div>
        
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  }
});
defineEmits(['update:modelValue']);
</script>
