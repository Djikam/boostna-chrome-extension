chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extractJobData") {
        // Tentative d'extraction intelligente du contenu principal
        const bodyClone = document.body.cloneNode(true);
        // Supprimer les éléments bruyants
        bodyClone.querySelectorAll('script, style, nav, footer, iframe, header').forEach(el => el.remove());

        const cleanText = bodyClone.innerText.replace(/\s\s+/g, ' ').trim();

        const jobData = {
            title: document.title,
            description: cleanText.substring(0, 10000), // Limiter pour éviter de saturer l'API
            url: window.location.href
        };
        sendResponse(jobData);
    }
    return true;
});
