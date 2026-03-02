<template>
  <div class="space-y-4 pb-6">
    <!-- Job Result -->
    <div v-if="type === 'job'" class="space-y-4">
      <div class="bg-blue-600/20 border border-blue-500/20 p-6 rounded-2xl flex items-center justify-between shadow-2xl">
        <div>
          <p class="text-[10px] uppercase font-black text-blue-400 tracking-tighter">Match Score</p>
          <h3 class="text-5xl font-black">{{ data.matchPercentage }}%</h3>
        </div>
        <div :class="`px-3 py-1 rounded-full text-[10px] font-black uppercase ${data.riskScore === 'low' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`">
            Risque {{ data.riskScore }}
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="bg-white/5 p-4 rounded-xl border border-white/5">
              <h4 class="font-bold mb-2 text-green-400">Skills OK</h4>
              <ul class="space-y-1 opacity-80"><li v-for="s in data.matchedSkills" :key="s">· {{ s }}</li></ul>
          </div>
          <div class="bg-white/5 p-4 rounded-xl border border-white/5">
              <h4 class="font-bold mb-2 text-red-400">À bosser</h4>
              <ul class="space-y-1 opacity-80"><li v-for="s in data.missingSkills" :key="s">· {{ s }}</li></ul>
          </div>
      </div>
    </div>

    <!-- Insight Result -->
    <div v-else-if="type === 'insight'" class="space-y-4">
        <div class="bg-purple-600/20 border border-purple-500/20 p-5 rounded-2xl shadow-xl">
            <p class="text-[10px] uppercase font-black text-purple-400 mb-2">Résumé Intelligent</p>
            <p class="text-sm leading-relaxed">{{ data.resume }}</p>
        </div>
        <div class="bg-white/5 p-4 rounded-xl space-y-3">
            <h4 class="text-xs font-bold text-purple-400">Points Clés</h4>
            <ul class="space-y-2 text-xs opacity-90"><li v-for="p in data.points_cles" :key="p" class="flex gap-2"><span>⚡</span> {{ p }}</li></ul>
        </div>
    </div>

    <!-- Email Result -->
    <div v-else-if="type === 'email'" class="space-y-4">
        <div class="bg-green-600/20 border border-green-500/20 p-5 rounded-2xl">
            <p class="text-[10px] uppercase font-black text-green-400 mb-1">Score d'impact</p>
            <h3 class="text-3xl font-black">{{ data.score }}/100</h3>
            <p class="text-xs mt-2 opacity-80">Ton: <b>{{ data.tone }}</b> | Clarté: <b>{{ data.clarity }}</b></p>
        </div>
        <div class="bg-white/5 p-4 rounded-xl">
            <h4 class="text-xs font-bold text-green-400 mb-2">Version Suggérée</h4>
            <p class="text-[11px] italic bg-black/40 p-3 rounded-lg border border-white/5 select-all">{{ data.suggestedVersion }}</p>
            <button @click="copy(data.suggestedVersion)" class="mt-2 text-[10px] text-blue-400 underline">Copier la version</button>
        </div>
    </div>

    <!-- Rate Result -->
    <div v-else-if="type === 'rate'" class="space-y-4">
        <div class="bg-yellow-600/20 border border-yellow-500/20 p-6 rounded-2xl text-center">
            <p class="text-[10px] uppercase font-black text-yellow-400 mb-1">Rate Recommandé</p>
            <h3 class="text-4xl font-black text-yellow-500">{{ data.suggestedRate }}</h3>
            <p class="text-xs mt-1 opacity-60">Plage: {{ data.minRate }} - {{ data.maxRate }}</p>
        </div>
        <div class="bg-white/5 p-4 rounded-xl">
            <h4 class="text-xs font-bold text-yellow-400 mb-2">Conseils Négociation</h4>
            <ul class="space-y-2 text-[11px] opacity-80">
                <li v-for="t in data.negotiationTips" :key="t" class="flex gap-2"><span>🤝</span> {{ t }}</li>
            </ul>
        </div>
    </div>

    <!-- Booster Result -->
    <div v-else-if="type === 'booster'" class="space-y-4">
        <div class="bg-orange-600/20 border border-orange-500/20 p-5 rounded-2xl">
            <p class="text-[10px] uppercase font-black text-orange-400 mb-2">État du Business</p>
            <div class="flex items-center gap-3">
                <div :class="`w-3 h-3 rounded-full animate-ping ${data.currentHealth === 'excellent' ? 'bg-green-500' : 'bg-yellow-500'}`"></div>
                <h3 class="text-xl font-bold capitalize">{{ data.currentHealth }}</h3>
            </div>
        </div>
        <div class="bg-white/5 p-4 rounded-xl">
            <h4 class="text-xs font-bold text-orange-400 mb-2">Actions de Croissance</h4>
            <ul class="space-y-2 text-xs">
                <li v-for="a in data.growthActions" :key="a" class="bg-orange-500/10 p-2 rounded border border-orange-500/10">📈 {{ a }}</li>
            </ul>
        </div>
    </div>

    <!-- Common Export -->
    <div class="pt-2">
        <button @click="exportReport" class="w-full bg-white/5 hover:bg-white/10 py-2.5 rounded-xl border border-white/10 text-xs font-bold transition-all">Exporter le rapport complet</button>
        <button @click="$emit('reset')" class="w-full text-[10px] opacity-30 mt-4 underline">Nouvelle analyse</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['type', 'data'])

const copy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copié !");
}

const exportReport = () => {
    const content = JSON.stringify(props.data, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BoostNa_${props.type}_${Date.now()}.json`;
    a.click();
}
</script>
