<template>
  <button class="bg-white/5 border border-white/5 p-4 rounded-2xl hover:bg-white/10 hover:border-blue-500/50 hover:scale-[1.02] active:scale-95 transition-all text-left flex flex-col gap-2 group shadow-lg">
    <div class="text-2xl mb-1 filter drop-shadow-md group-hover:scale-110 transition-transform">{{ tool.icon }}</div>
    <div>
        <h3 class="font-bold text-sm text-slate-100">{{ tool.name }}</h3>
        <p class="text-[10px] text-slate-400 font-medium">{{ tool.desc }}</p>
    </div>
  </button>
</template>

<script setup>
defineProps(['tool'])
</script>
