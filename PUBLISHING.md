# Guide de Publication - BoostNa 🚀

Ce document récapitule les étapes pour publier l'extension **BoostNa** sur le Chrome Web Store.

## B. Créer un compte Chrome Web Store Developer

1. Va sur : [Chrome Web Store Dev Console](https://chrome.google.com/webstore/devconsole)
2. Connecte-toi avec ton compte Google.
3. Paye les **5$** une seule fois (frais d’inscription).
4. Remplis les infos du compte (nom : **Debaloa Gongue Djikam** ou **BoostNa**).

## C. Publier l’extension (étapes précises)

1. Dans le Developer Console → **"New item"**.
2. **Build du projet** : Lance `npm run build` pour générer le dossier `dist`.
3. **Compression** : Compresse le **contenu** du dossier `dist` en un fichier ZIP (pas le dossier lui-même, mais les fichiers à l'intérieur).
4. **Upload** : Importe le fichier ZIP.
5. **Remplis les métadonnées** :
   - **Nom** : BoostNa – Ton Coach Carrière & IA
   - **Description détaillée** : Utilise les fonctionnalités décrites dans le README.
   - **Catégorie** : Productivity
   - **Icône** : 128x128
   - **Screenshots** : Au moins 1 (recommandé : 3-4).
   - **Site web** : [https://github.com/Djikam/boostna-chrome-extension](https://github.com/Djikam/boostna-chrome-extension)
   - **Privacy policy** : Lien vers un Google Doc simple ou mention "No user data collected".
6. **Soumission** : Soumets pour review (compter 3 à 7 jours).

## D. Après validation

- Tu auras un lien public : `https://chromewebstore.google.com/detail/boostna/xxxxxxxx`
- Tu peux mettre à jour l’extension en changeant la version dans `manifest.json` et en uploadant un nouveau ZIP.
- **Test local** : Utilise toujours `chrome://extensions/` -> **"Load unpacked"** sur ton dossier `dist` avant de publier une mise à jour.
