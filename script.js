// Ajan listesi ve özellikleri
const agents = [
    { name: "Jett", role: "Duelist", image: "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltceaa6cf20d328bd5/5eb26f54402b8b4d13a56656/agent-jett.png", scores: { aggressive: 3, stealth: 1, teamplay: 1, utility: 2 } },
    { name: "Omen", role: "Controller", image: "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt63486e6f7a5d0e5d/5eb26f7b4a28a966a7dbef76/agent-omen.png", scores: { aggressive: 1, stealth: 3, teamplay: 2, utility: 3 } },
    { name: "Sova", role: "Initiator", image: "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltf9fc34106a23479a/5eb26f7bedf2cf6b6b4f6f3d/agent-sova.png", scores: { aggressive: 2, stealth: 2, teamplay: 3, utility: 3 } },
    { name: "Sage", role: "Sentinel", image: "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt8a627ec10b57f4f2/5eb26f7b95b72c6d9835cb6b/agent-sage.png", scores: { aggressive: 1, stealth: 1, teamplay: 3, utility: 2 } },
    { name: "Reyna", role: "Duelist", image: "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt6577b1f58530e6b2/5eb26f7b0c25104b27c36e59/agent-reyna.png", scores: { aggressive: 3, stealth: 2, teamplay: 1, utility: 1 } },
    { name: "Killjoy", role: "Sentinel", image: "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt53405c26141cec00/5f2207393163d654b7d9e0bd/agent-killjoy.png", scores: { aggressive: 2, stealth: 1, teamplay: 2, utility: 3 } }
];

// Soru eşleştirmeleri
const questionMapping = {
    "q1": { "agresif": "aggressive", "defansif": "stealth", "destek": "teamplay" },
    "q2": { "yetenek": "utility", "silah": "aggressive", "denge": "teamplay" },
    "q3": { "kontrol": "teamplay", "giris": "aggressive", "info": "utility" }
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
    
    // Tüm cevapları topla
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
            <img src="${agent.image}" alt="${agent.name}">
            <h3>${agent.name}</h3>
            <p>${agent.role}</p>
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
