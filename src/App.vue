<template>
  <div class="flex flex-col w-[450px] min-h-[550px] bg-slate-900 text-slate-100 font-sans shadow-2xl overflow-hidden">
    <!-- Top Navbar -->
    <header class="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
      <div @click="currentView = 'home'" class="flex items-center gap-2 cursor-pointer group">
        <div class="flex p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-lg overflow-hidden bg-gradient-to-br from-green-600 via-red-600 to-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        </div>
        <h1 class="font-black text-xl tracking-tight bg-gradient-to-r from-green-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">BoostNa</h1>
      </div>
      <div class="flex items-center gap-2">
        <button @click="currentView = 'history'" title="Historique" class="p-2 hover:bg-white/5 rounded-full transition-colors relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
        </button>
        <button @click="currentView = 'settings'" title="Paramètres" class="p-2 hover:bg-white/5 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
    </header>

    <!-- Content Area -->
    <div class="flex-1 p-4 overflow-y-auto">
      
      <!-- Home Grid -->
      <div v-if="currentView === 'home'" class="grid grid-cols-2 gap-3 animate-in fade-in duration-300">
        <ToolCard 
          v-for="tool in tools" 
          :key="tool.id" 
          :tool="tool" 
          @click="startTool(tool)"
        />
      </div>

      <!-- Analysis Loader -->
      <div v-else-if="currentView === 'loading'" class="flex flex-col items-center justify-center py-20 animate-pulse">
        <div class="w-16 h-16 border-4 border-red-500 border-t-yellow-400 border-b-green-500 rounded-full animate-spin mb-6"></div>
        <p class="text-lg font-bold">BoostNa analyse...</p>
        <p class="text-sm opacity-50 mt-2">Utilisation de Gemini 1.5 Flash</p>
      </div>

      <!-- Results View -->
      <div v-else-if="currentView === 'result'" class="animate-in slide-in-from-bottom duration-500 flex flex-col gap-4">
        <div class="flex items-center justify-between">
            <h2 class="text-sm font-bold uppercase text-blue-400 tracking-widest">{{ activeTool.name }}</h2>
            <button @click="currentView = 'home'" class="text-xs opacity-50 hover:opacity-100 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
                Retour
            </button>
        </div>
        <ResultRenderer :type="activeTool.id" :data="analysis" @reset="currentView = 'home'" />
      </div>

      <!-- History View -->
      <div v-else-if="currentView === 'history'" class="animate-in slide-in-from-left duration-300">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold">Historique</h2>
            <button @click="clearHistory" class="text-[10px] text-red-400 font-bold uppercase hover:bg-red-500/10 px-2 py-1 rounded">Vider</button>
        </div>
        <div v-if="history.length === 0" class="text-center py-20 opacity-30 italic">Rien ici pour le moment.</div>
        <div v-else class="space-y-2">
            <div v-for="item in history" :key="item.id" @click="viewHistoryItem(item)" class="bg-white/5 border border-white/5 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-all flex justify-between items-center group">
                <div class="flex items-center gap-3">
                    <div :class="`w-2 h-2 rounded-full ${getToolColor(item.type)}`"></div>
                    <div>
                        <p class="text-xs font-bold truncate max-w-[200px]">{{ item.title }}</p>
                        <p class="text-[10px] opacity-40">{{ item.date }}</p>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-0 group-hover:opacity-100"><path d="m9 18 6-6-6-6"/></svg>
            </div>
        </div>
      </div>

      <!-- Settings View -->
      <div v-else-if="currentView === 'settings'" class="animate-in slide-in-from-right duration-300 space-y-4">
        <h2 class="text-lg font-bold">Configuration</h2>
        <div class="space-y-3">
            <div class="flex flex-col gap-1">
                <label class="text-[10px] font-bold uppercase opacity-50 px-1">Clé API Gemini</label>
                <input v-model="settings.apiKey" type="password" placeholder="AIzaSy..." class="bg-slate-800 border-white/10 border p-2 rounded-lg text-xs focus:ring-2 ring-blue-500 outline-none" />
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-[10px] font-bold uppercase opacity-50 px-1">Ton CV / Profil (Texte)</label>
                <textarea v-model="settings.cvText" placeholder="Ton expérience, tes skills..." class="bg-slate-800 border-white/10 border p-2 rounded-lg text-xs h-40 focus:ring-2 ring-blue-500 outline-none"></textarea>
            </div>
            <button @click="saveSettings" class="w-full bg-blue-600 font-bold py-2 rounded-lg hover:bg-blue-500 shadow-xl shadow-blue-600/20 active:scale-95 transition-all">Sauvegarder</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ToolCard from './components/ToolCard.vue'
import ResultRenderer from './components/ResultRenderer.vue'

const currentView = ref('home')
const activeTool = ref(null)
const analysis = ref(null)
const history = ref([])
const settings = ref({ apiKey: '', cvText: '' })

const tools = [
  { id: 'job', name: 'Job Match', icon: '🎯', desc: 'CV vs Offre' },
  { id: 'insight', name: 'Smart Insight', icon: '🧠', desc: 'Résumé express' },
  { id: 'email', name: 'Email/Proposal', icon: '✉️', desc: 'Optimise tes écrits' },
  { id: 'rate', name: 'Rate Analyzer', icon: '💰', desc: 'Tarifs & Négociation' },
  { id: 'booster', name: 'Booster Hub', icon: '⚡', desc: 'Conseils ArtiPlus' },
  { id: 'apply', name: 'Apply Helper', icon: '📝', desc: 'Aide à la saisie' }
]

onMounted(() => {
  chrome.storage.local.get(['apiKey', 'cvText', 'history'], (res) => {
    settings.value.apiKey = res.apiKey || ''
    settings.value.cvText = res.cvText || ''
    history.value = res.history || []
  })
})

const saveSettings = () => {
    chrome.storage.local.set(settings.value, () => {
        currentView.value = 'home'
    })
}

const getToolColor = (type) => {
    const colors = { job: 'bg-blue-400', insight: 'bg-purple-400', email: 'bg-green-400', rate: 'bg-yellow-400', booster: 'bg-orange-400', apply: 'bg-pink-400' }
    return colors[type] || 'bg-slate-400'
}

const startTool = async (tool) => {
  if (!settings.value.apiKey) {
    currentView.value = 'settings'
    return
  }
  
  activeTool.value = tool
  currentView.value = 'loading'

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.tabs.sendMessage(tab.id, { action: "extractJobData" }, (pageData) => {
      if (!pageData) {
        alert("Erreur: Impossible de lire la page.")
        currentView.value = 'home'
        return
      }

      chrome.runtime.sendMessage({
        action: tool.id,
        apiKey: settings.value.apiKey,
        cv: settings.value.cvText,
        content: pageData.description,
        title: pageData.title
      }, (response) => {
        if (response?.success) {
          analysis.value = response.analysis
          currentView.value = 'result'
          chrome.storage.local.get(['history'], (res) => history.value = res.history || [])
        } else {
          alert("Erreur IA: " + (response?.error || 'Inconnue'))
          currentView.value = 'home'
        }
      })
    })
  } catch (err) {
    alert("Erreur: " + err.message)
    currentView.value = 'home'
  }
}

const viewHistoryItem = (item) => {
    activeTool.value = tools.find(t => t.id === item.type)
    analysis.value = item.analysis
    currentView.value = 'result'
}

const clearHistory = () => {
    if(confirm("Effacer l'historique ?")) {
        chrome.storage.local.set({ history: [] }, () => history.value = [])
    }
}
</script>

<style>
.animate-in { animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
