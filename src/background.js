// BoostNa - Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
    console.log("BoostNa installed.");
    chrome.storage.local.get(['history'], (result) => {
        if (!result.history) {
            chrome.storage.local.set({ history: [] });
        }
    });
});

async function callGemini(prompt, apiKey) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        
        const textResponse = data.candidates[0].content.parts[0].text;
        const jsonString = textResponse.replace(/```json|```/g, "").trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}

const PROMPTS = {
    job: (cv, job) => `
        Tu es un expert recruteur senior. Analyse cette offre et ce CV.
        Réponds UNIQUEMENT en JSON :
        {
            "matchPercentage": number,
            "matchedSkills": string[],
            "missingSkills": string[],
            "atsKeywords": string[],
            "applicationTips": string[],
            "riskScore": "low"|"medium"|"high",
            "riskReason": string
        }
        JOB: ${job}
        CV: ${cv}`,
    
    insight: (content) => `
        Tu es un expert en synthèse. Analyse cette page.
        Réponds UNIQUEMENT en JSON :
        {
            "resume": string,
            "points_cles": string[],
            "sentiment": string,
            "temps_lecture": string,
            "mots_cles": string[],
            "questions": string[]
        }
        CONTENT: ${content}`,

    email: (text) => `
        Tu es un expert en communication professionnelle. Analyse cette proposition/email.
        Réponds UNIQUEMENT en JSON :
        {
            "score": number,
            "tone": string,
            "clarity": string,
            "improvements": string[],
            "suggestedVersion": string,
            "culturalNotes": string
        }
        TEXT: ${text}`,

    rate: (job, profile) => `
        Tu es un analyste de marché freelance. Évalue le tarif horaire pour ce job basé sur ce profil.
        Réponds UNIQUEMENT en JSON :
        {
            "suggestedRate": string,
            "minRate": string,
            "maxRate": string,
            "marketPosition": string,
            "competitorInsight": string,
            "negotiationTips": string[]
        }
        JOB: ${job}
        PROFILE: ${profile}`,

    booster: (statsText) => `
        Tu es un expert en business Intelligence pour ArtiPlus. Analyse ces données et donne des conseils de croissance.
        Réponds UNIQUEMENT en JSON :
        {
            "currentHealth": "excellent"|"good"|"warning",
            "keyInsights": string[],
            "growthActions": string[],
            "predictedTrend": string
        }
        DATA: ${statsText}`
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { action, apiKey, cv, content, title } = request;

    if (PROMPTS[action]) {
        const prompt = action === 'job' ? PROMPTS.job(cv, content) :
                       action === 'rate' ? PROMPTS.rate(content, cv) :
                       PROMPTS[action](content);

        callGemini(prompt, apiKey)
            .then(result => {
                chrome.storage.local.get(['history'], (data) => {
                    const history = data.history || [];
                    const newEntry = {
                        id: Date.now(),
                        type: action,
                        date: new Date().toLocaleString('fr-FR'),
                        title: title || "Analyse BoostNa",
                        analysis: result
                    };
                    chrome.storage.local.set({ history: [newEntry, ...history].slice(0, 20) });
                });
                sendResponse({ success: true, analysis: result });
            })
            .catch(err => sendResponse({ success: false, error: err.message }));
        return true;
    }
});
