<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-slate-900 font-sans">
    <LayoutNavbar />
    <main class="flex-grow">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
// Default layout
</script>
