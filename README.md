# BoostNa – Ton Coach Carrière & IA 🚀

**BoostNa** est une extension Chrome surpuissante conçue pour booster ta carrière, optimiser tes candidatures et analyser tes contenus professionnels avec l'intelligence de Google Gemini 1.5 Flash. 100% adapté aux besoins du marché (et avec une touche camerounaise 🇨🇲).

## ✨ Fonctionnalités

- 🎯 **Job Match** : Compare ton CV avec une offre d'emploi pour obtenir un score de compatibilité, les points forts et les compétences manquantes.
- 🧠 **Smart Insight** : Résumé express de n'importe quelle page web pour capter l'essentiel en un clin d'œil.
- ✉️ **Email/Proposal** : Analyse et optimise tes brouillons d'emails ou de propositions pour un impact maximum.
- 💰 **Rate Analyzer** : Estime ton tarif journalier/horaire idéal en fonction de ton profil et de l'offre.
- ⚡ **Booster Hub** : Conseils stratégiques basés sur tes données ArtiPlus.
- 📝 **Apply Helper** : Aide intelligente pour remplir tes formulaires de candidature.

## 🛠️ Stack Technique

- **Framework** : Vue 3 (Vite)
- **Styling** : Tailwind CSS
- **IA** : Google Gemini 1.5 Flash API
- **Langage** : JavaScript / SFC Vue

## 🚀 Installation & Développement

### Prérequis

- [Node.js](https://nodejs.org/) (version 18+)
- Une clé API [Google AI Studio](https://aistudio.google.com/)

### Setup

1. Clone le dépôt :

   ```bash
   git clone https://github.com/Djikam/boostna-chrome-extension.git
   cd boostna-chrome-extension
   ```

2. Installe les dépendances :

   ```bash
   npm install
   ```

3. Lance le serveur de développement :

   ```bash
   npm run dev
   ```

4. Compile pour la production :
   ```bash
   npm run build
   ```

### Charger l'extension dans Chrome

1. Va sur `chrome://extensions/`.
2. Active le **Mode développeur** (en haut à droite).
3. Clique sur **Charger l'extension décompressée**.
4. Sélectionne le dossier `dist` généré par le build.

## 📁 Architecture du Projet

- `src/background.js` : Service worker gérant les appels à l'API Gemini et l'historique.
- `src/content.js` : Script injecté dans les pages pour extraire les données.
- `src/App.vue` : Interface principale de la popup.
- `public/manifest.json` : Configuration de l'extension Chrome.

## 📄 Licence

MIT
