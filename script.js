// Ajan listesi ve özellikleri
const agents = [
    {
        name: "Jett",
        role: "Duelist",
        image: "images/jett.jpg",
        scores: {
            aggressive: 3,
            stealth: 1,
            teamplay: 1,
            utility: 2
        }
    },
    {
        name: "Omen",
        role: "Controller",
        image: "images/omen.jpg",
        scores: {
            aggressive: 1,
            stealth: 3,
            teamplay: 2,
            utility: 2
        }
    },
    {
        name: "Sova",
        role: "Initiator",
        image: "images/sova.jpg",
        scores: {
            aggressive: 2,
            stealth: 2,
            teamplay: 3,
            utility: 3
        }
    },
    {
        name: "Sage",
        role: "Sentinel",
        image: "images/sage.jpg",
        scores: {
            aggressive: 1,
            stealth: 1,
            teamplay: 3,
            utility: 2
        }
    },
    {
        name: "Reyna",
        role: "Duelist",
        image: "images/reyna.jpg",
        scores: {
            aggressive: 3,
            stealth: 2,
            teamplay: 1,
            utility: 1
        }
    },
    {
        name: "Killjoy",
        role: "Sentinel",
        image: "images/killjoy.jpg",
        scores: {
            aggressive: 2,
            stealth: 1,
            teamplay: 2,
            utility: 3
        }
    }
];

// Her sorunun score kategori karşılığı
const questionMapping = {
    "q1": { "evet": "aggressive", "hayır": "stealth" },
    "q2": { "evet": "utility", "hayır": "aggressive" },
    "q3": { "evet": "teamplay", "hayır": "stealth" }
};

// Cevapları analiz et
function getUserProfile() {
    const answers = {};
    for (let qid in questionMapping) {
        const selected = document.querySelector(`input[name="${qid}"]:checked`);
        if (selected) {
            const category = questionMapping[qid][selected.value];
            answers[category] = (answers[category] || 0) + 1;
        }
    }
    return answers;
}

// Ajanları puanla
function scoreAgents(userProfile) {
    return agents.map(agent => {
        let score = 0;
        for (let key in userProfile) {
            score += agent.scores[key] * userProfile[key];
        }
        return { ...agent, score };
    }).sort((a, b) => b.score - a.score).slice(0, 3);
}

// Sonuçları göster
function showResults() {
    const results = document.getElementById("result");
    const topAgents = scoreAgents(getUserProfile());

    const container = document.getElementById("agentResults");
    container.innerHTML = ""; // temizle

    topAgents.forEach(agent => {
        const card = document.createElement("div");
        card.className = "agent-card";
        card.innerHTML = `
            <img src="${agent.image}" alt="${agent.name}">
            <h3>${agent.name}</h3>
            <p>${agent.role}</p>
        `;
        container.appendChild(card);
    });

    results.classList.remove("hidden");
}
