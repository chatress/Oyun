// Ajan listesi ve özellikleri
const agents = [
    { name: "Jett", role: "Duelist", image: "images/jett.jpeg", scores: { aggressive: 3, stealth: 1, teamplay: 1, utility: 2 } },
    { name: "Omen", role: "Controller", image: "images/omen.jpeg", scores: { aggressive: 1, stealth: 3, teamplay: 2, utility: 3 } },
    { name: "Sova", role: "Initiator", image: "images/sova.jpeg", scores: { aggressive: 2, stealth: 2, teamplay: 3, utility: 3 } },
    { name: "Sage", role: "Sentinel", image: "images/sage.jpeg", scores: { aggressive: 1, stealth: 1, teamplay: 3, utility: 2 } },
    { name: "Reyna", role: "Duelist", image: "images/reyna.jpeg", scores: { aggressive: 3, stealth: 2, teamplay: 1, utility: 1 } },
    { name: "Killjoy", role: "Sentinel", image: "images/killjoy.jpeg", scores: { aggressive: 2, stealth: 1, teamplay: 2, utility: 3 } },
    { name: "Brimstone", role: "Controller", image: "images/brimstone.jpeg", scores: { aggressive: 1, stealth: 2, teamplay: 3, utility: 3 } },
    { name: "Phoenix", role: "Duelist", image: "images/phoenix.jpeg", scores: { aggressive: 3, stealth: 1, teamplay: 1, utility: 2 } },
    { name: "Viper", role: "Control", image: "images/viper.jpeg", scores: { aggressive: 1, stealth: 3, teamplay: 2, utility: 3 } },
    { name: "Cypher", role: "Sentinel", image: "images/cypher.jpeg", scores: { aggressive: 2, stealth: 2, teamplay: 2, utility: 2 } },
    { name: "Breach", role: "Initiator", image: "images/breach.jpeg", scores: { aggressive: 3, stealth: 1, teamplay: 2, utility: 3 } },
    { name: "Raze", role: "Duelist", image: "images/raze.jpeg", scores: { aggressive: 3, stealth: 1, teamplay: 1, utility: 2 } },
    { name: "Skye", role: "Initiator", image: "images/skye.jpeg", scores: { aggressive: 1, stealth: 2, teamplay: 2, utility: 3 } },
    { name: "Yoru", role: "Duelist", image: "images/yoru.jpeg", scores: { aggressive: 3, stealth: 2, teamplay: 1, utility: 1 } },
    { name: "Astra", role: "Control", image: "images/astra.jpeg", scores: { aggressive: 1, stealth: 3, teamplay: 2, utility: 2 } },
    { name: "Kay/O", role: "Initiator", image: "images/kayo.jpeg", scores: { aggressive: 2, stealth: 1, teamplay: 3, utility: 2 } },
    { name: "Chamber", role: "Sentinel", image: "images/chamber.jpeg", scores: { aggressive: 2, stealth: 1, teamplay: 1, utility: 3 } },
    { name: "Neon", role: "Duelist", image: "images/neon.jpeg", scores: { aggressive: 2, stealth: 1, teamplay: 2, utility: 3 } },
    { name: "Fade", role: "Initiator", image: "images/fade.jpeg", scores: { aggressive: 2, stealth: 2, teamplay: 2, utility: 2 } },
    { name: "Harbor", role: "Control", image: "images/harbor.jpeg", scores: { aggressive: 2, stealth: 3, teamplay: 3, utility: 2 } },
    { name: "Gekko", role: "Initiator", image: "images/gekko.jpeg", scores: { aggressive: 2, stealth: 1, teamplay: 2, utility: 1 } },
    { name: "Deadlock", role: "Sentinel", image: "images/deadlock.jpeg", scores: { aggressive: 1, stealth: 1, teamplay: 2, utility: 3 } },
    { name: "Iso", role: "Duelist", image: "images/iso.jpeg", scores: { aggressive: 3, stealth: 2, teamplay: 1, utility: 1 } },
    { name: "Clove", role: "Control", image: "images/clove.jpeg", scores: { aggressive: 1, stealth: 3, teamplay: 3, utility: 2 } },
    { name: "Vyse", role: "Sentinel", image: "images/vyse.jpeg", scores: { aggressive: 1, stealth: 1, teamplay: 2, utility: 3 } },
    { name: "Tejo", role: "Initiator", image: "images/tejo.jpeg", scores: { aggressive: 3, stealth: 1, teamplay: 2, utility: 2 } },
    { name: "Waylay", role: "Duelist", image: "images/waylay.jpeg", scores: { aggressive: 3, stealth: 1, teamplay: 1, utility: 1 } }
];

// Soru eşleştirmeleri (YENİ SORULARA GÖRE GÜNCELLENDİ)
const questionMapping = {
    "q1": { "agresif": "aggressive", "defansif": "stealth", "destek": "teamplay" },
    "q2": { "yetenek": "utility", "silah": "aggressive", "denge": "teamplay" },
    "q3": { "kontrol": "teamplay", "giris": "aggressive", "info": "utility" },
    "q4": { "kontrol": "utility", "giris": "aggressive", "info": "teamplay" }, // Yeni soru
    "q5": { "kontrol": "stealth", "giris": "aggressive", "info": "teamplay" }, // Yeni soru
    "q6": { "kontrol": "stealth", "giris": "aggressive", "info": "utility" }   // Yeni soru
};

// DOM Elementleri
const quizForm = document.getElementById('quizForm');
const questions = document.querySelectorAll('.question');
const resultDiv = document.getElementById('result');
const agentResultsDiv = document.getElementById('agentResults');
const progressBar = document.getElementById('progressBar');
const nextButtons = document.querySelectorAll('.next-btn');
const submitButton = document.querySelector('.submit-btn');

let currentQuestionIndex = 0;

// İlerleme çubuğunu güncelle
function updateProgressBar() {
    progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
}

// Sonraki soruya geç
function goToNextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.querySelector('input:checked');

    if (!selectedAnswer) {
        alert('Lütfen bir seçenek seçin!');
        return;
    }

    currentQuestion.style.display = 'none';
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        questions[currentQuestionIndex].style.display = 'block';
        updateProgressBar();
    }
}

// Ajanları puanla ve sırala
function scoreAgents(answers) {
    const scoredAgents = agents.map(agent => {
        let score = 0;
        for (const category in answers) {
            score += (agent.scores[category] || 0) * answers[category];
        }
        return { ...agent, score };
    });

    return scoredAgents.sort((a, b) => b.score - a.score).slice(0, 3);
}

// Sonuçları göster
function showResults() {
    const answers = {};
    
    // Tüm cevapları topla (6 soruya göre güncellendi)
    questions.forEach((question, index) => {
        const selected = question.querySelector(`input[name="q${index + 1}"]:checked`);
        if (selected) {
            const category = questionMapping[`q${index + 1}`][selected.value];
            answers[category] = (answers[category] || 0) + 1;
        }
    });

    // En iyi 3 ajanı al
    const topAgents = scoreAgents(answers);

    // Sonuçları render et
    agentResultsDiv.innerHTML = '';
    topAgents.forEach(agent => {
        const card = document.createElement('div');
        card.className = "agent-card";
        card.innerHTML = `
            <img src="${agent.image}" alt="${agent.name}" onerror="this.src='images/default.jpg'">
            <h3>${agent.name}</h3>
            <p>${agent.role}</p>
            <small>${agent.score} Puan</small>
        `;
        agentResultsDiv.appendChild(card);
    });

    quizForm.style.display = 'none';
    resultDiv.classList.remove('hidden');
}

// Testi yeniden başlat
function restartQuiz() {
    currentQuestionIndex = 0;
    quizForm.reset();
    questions.forEach((q, i) => {
        q.style.display = i === 0 ? 'block' : 'none';
    });
    resultDiv.classList.add('hidden');
    quizForm.style.display = 'block';
    updateProgressBar();
}

// Event Listeners
nextButtons.forEach(btn => {
    btn.addEventListener('click', goToNextQuestion);
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    showResults();
});

// Sayfa yüklendiğinde ilk soruyu göster
document.addEventListener('DOMContentLoaded', () => {
    questions[0].style.display = 'block';
    updateProgressBar();
});
