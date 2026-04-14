<template>
  <footer class="bg-white border-t border-gray-100 pt-16 pb-8">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 bg-[#C1ED00] rounded-lg flex items-center justify-center font-black text-slate-900">
              N
            </div>
            <span class="text-lg font-bold tracking-tight text-slate-900">NeedMeet</span>
          </div>
          <p class="text-gray-500 max-w-sm mb-6 leading-relaxed">
            Connecting you with top-rated professionals for all your home and personal needs. Trusted service at your fingertips.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-bold text-slate-900 mb-6">Explore</h4>
          <ul class="space-y-4">
            <li><NuxtLink to="/explore" class="text-gray-500 hover:text-slate-900 transition-colors">Browse Professionals</NuxtLink></li>
            <li><NuxtLink to="/categories" class="text-gray-500 hover:text-slate-900 transition-colors">Categories</NuxtLink></li>
            <li><NuxtLink to="/how-it-works" class="text-gray-500 hover:text-slate-900 transition-colors">How it Works</NuxtLink></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="font-bold text-slate-900 mb-6">Support</h4>
          <ul class="space-y-4">
            <li><NuxtLink to="/help" class="text-gray-500 hover:text-slate-900 transition-colors">Help Center</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="text-gray-500 hover:text-slate-900 transition-colors">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="/terms" class="text-gray-500 hover:text-slate-900 transition-colors">Terms of Service</NuxtLink></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-gray-400">
          © 2026 NeedMeet. All rights reserved.
        </p>
        <div class="flex gap-6">
          <a href="#" class="text-gray-400 hover:text-slate-900 transition-colors">Twitter</a>
          <a href="#" class="text-gray-400 hover:text-slate-900 transition-colors">Instagram</a>
          <a href="#" class="text-gray-400 hover:text-slate-900 transition-colors">LinkedIn</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component
</script>
