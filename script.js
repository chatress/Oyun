// Çeviri verisi
const translations = {
    tr: {
        title: "Valorant Ajan Önerici",
        question1: "1. Oyun stiliniz nasıl?",
        q1_opt1: "Agresif",
        q1_opt2: "Defansif",
        q1_opt3: "Takım destekli",
        
        question2: "2. Yetenek mi silah mı?",
        q2_opt1: "Yetenek",
        q2_opt2: "Silah",
        q2_opt3: "Denge",

        question3: "3. Harita kontrolü mü giriş mi?",
        q3_opt1: "Harita kontrolü",
        q3_opt2: "Giriş yapmayı severim",
        q3_opt3: "Bilgi toplamak",

        question4: "4. Ekibinizde hangi rolü üstlenirsiniz?",
        q4_opt1: "Giriş",
        q4_opt2: "Duman",
        q4_opt3: "Destek",

        question5: "5. Oyun sonu (clutch) durumlarında nasıl davranırsınız?",
        q5_opt1: "Pusarım",
        q5_opt2: "Yüzleşirim",
        q5_opt3: "Kaçarım",

        question6: "6. Hangi silahı sıklıkla kullanırsınız?",
        q6_opt1: "Operatör",
        q6_opt2: "Vandal",
        q6_opt3: "Phantom",

        resultTitle: "Senin için en uygun ajanlar:",
        restartQuiz: "Yeniden Dene",
        nextButton: "Sonraki",
        submitButton: "Ajanları Öner",
        alertMessage: "Lütfen bir seçenek seçin!"
    },
    en: {
        title: "Valorant Agent Recommender",
        question1: "1. What is your playstyle?",
        q1_opt1: "Aggressive",
        q1_opt2: "Defensive",
        q1_opt3: "Team support",

        question2: "2. Abilities or weapons?",
        q2_opt1: "Abilities",
        q2_opt2: "Weapons",
        q2_opt3: "Balance",

        question3: "3. Map control or entry?",
        q3_opt1: "Map control",
        q3_opt2: "I like to entry",
        q3_opt3: "Gather information",

        question4: "4. What role do you take in your team?",
        q4_opt1: "Entry",
        q4_opt2: "Smoke",
        q4_opt3: "Support",

        question5: "5. How do you act in clutch situations?",
        q5_opt1: "I lurk",
        q5_opt2: "I confront",
        q5_opt3: "I escape",

        question6: "6. Which weapon do you use frequently?",
        q6_opt1: "Operator",
        q6_opt2: "Vandal",
        q6_opt3: "Phantom",

        resultTitle: "Recommended agents for you:",
        restartQuiz: "Try Again",
        nextButton: "Next",
        submitButton: "Suggest Agents",
        alertMessage: "Please select an option!"
    }
};

let currentLang = 'tr';

function changeLanguage(lang) {
    currentLang = lang;
    document.getElementById('title').innerText = translations[lang].title;
    
    // Soruların metinlerini güncelle
    document.getElementById('question1-label').innerText = translations[lang].question1;
    document.getElementById('question2-label').innerText = translations[lang].question2;
    document.getElementById('question3-label').innerText = translations[lang].question3;
    document.getElementById('question4-label').innerText = translations[lang].question4;
    document.getElementById('question5-label').innerText = translations[lang].question5;
    document.getElementById('question6-label').innerText = translations[lang].question6;

    // Cevap seçeneklerinin metinlerini güncelle
    for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 3; j++) {
            const spanId = `q${i}_opt${j}`;
            const spanElement = document.getElementById(spanId);
            if (spanElement) {
                spanElement.innerText = ' ' + translations[lang][spanId]; // Başına boşluk ekleyerek düzgün görünmesini sağlar
            }
        }
    }

    // Düğmelerin metinlerini güncelle
    document.getElementById('results-title').innerText = translations[lang].resultTitle;
    document.getElementById('restartButton').innerText = translations[lang].restartQuiz;
    
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.innerText = translations[lang].nextButton;
    });
    document.getElementById('submitBtn').innerText = translations[lang].submitButton;
}


// Ajan listesi ve özellikleri (Bu kısımda değişiklik yok)
const agents = [
    { name: "Jett", role: "Duelist", image: "images/jett.jpeg", scores: { aggressive: 3, stealth: 1, teamplay: 1, utility: 2 } },
    { name: "Omen", role: "Controller", image: "images/omen.jpeg", scores: { aggressive: 1, stealth: 3, teamplay: 2, utility: 2 } },
    { name: "Sova", role: "Initiator", image: "images/sova.jpeg", scores: { aggressive: 1, stealth: 2, teamplay: 3, utility: 3 } },
    { name: "Sage", role: "Sentinel", image: "images/sage.jpeg", scores: { aggressive: 1, stealth: 1, teamplay: 3, utility: 2 } },
    { name: "Reyna", role: "Duelist", image: "images/reyna.jpeg", scores: { aggressive: 3, stealth: 2, teamplay: 1, utility: 1 } },
    { name: "Killjoy", role: "Sentinel", image: "images/killjoy.jpeg", scores: { aggressive: 1, stealth: 1, teamplay: 3, utility: 3 } },
    { name: "Brimstone", role: "Controller", image: "images/brimstone.jpeg", scores: { aggressive: 1, stealth: 3, teamplay: 2, utility: 1 } },
    { name: "Phoenix", role: "Duelist", image: "images/phoenix.jpeg", scores: { aggressive: 3, stealth: 1, teamplay: 1, utility: 2 } },
    { name: "Viper", role: "Control", image: "images/viper.jpeg", scores: { aggressive: 1, stealth: 3, teamplay: 2, utility: 2 } },
    { name: "Cypher", role: "Sentinel", image: "images/cypher.jpeg", scores: { aggressive: 1, stealth: 2, teamplay: 3, utility: 3 } },
    { name: "Breach", role: "Initiator", image: "images/breach.jpeg", scores: { aggressive: 1, stealth: 1, teamplay: 3, utility: 2 } },
    { name: "Raze", role: "Duelist", image: "images/raze.jpeg", scores: { aggressive: 3, stealth: 1, teamplay: 1, utility: 2 } },
    { name: "Skye", role: "Initiator", image: "images/skye.jpeg", scores: { aggressive: 1, stealth: 1, teamplay: 2, utility: 3 } },
    { name: "Yoru", role: "Duelist", image: "images/yoru.jpeg", scores: { aggressive: 3, stealth: 2, teamplay: 1, utility: 1 } },
    { name: "Astra", role: "Control", image: "images/astra.jpeg", scores: { aggressive: 1, stealth: 3, teamplay: 2, utility: 2 } },
    { name: "Kay/O", role: "Initiator", image: "images/kayo.jpeg", scores: { aggressive: 1, stealth: 1, teamplay: 3, utility: 2 } },
    { name: "Chamber", role: "Sentinel", image: "images/chamber.jpeg", scores: { aggressive: 1, stealth: 1, teamplay: 3, utility: 3 } },
    { name: "Neon", role: "Duelist", image: "images/neon.jpeg", scores: { aggressive: 3, stealth: 1, teamplay: 2, utility: 1 } },
    { name: "Fade", role: "Initiator", image: "images/fade.jpeg", scores: { aggressive: 1, stealth: 2, teamplay: 2, utility: 2 } },
    { name: "Harbor", role: "Control", image: "images/harbor.jpeg", scores: { aggressive: 1, stealth: 3, teamplay: 2, utility: 2 } },
    { name: "Gekko", role: "Initiator", image: "images/gekko.jpeg", scores: { aggressive: 1, stealth: 1, teamplay: 3, utility: 2 } },
    { name: "Deadlock", role: "Sentinel", image: "images/deadlock.jpeg", scores: { aggressive: 1, stealth: 1, teamplay: 2, utility: 3 } },
    { name: "Iso", role: "Duelist", image: "images/iso.jpeg", scores: { aggressive: 3, stealth: 2, teamplay: 1, utility: 1 } },
    { name: "Clove", role: "Control", image: "images/clove.jpeg", scores: { aggressive: 1, stealth: 3, teamplay: 2, utility: 2 } },
    { name: "Vyse", role: "Sentinel", image: "images/vyse.jpeg", scores: { aggressive: 1, stealth: 1, teamplay: 3, utility: 3 } },
    { name: "Tejo", role: "Initiator", image: "images/tejo.jpeg", scores: { aggressive: 1, stealth: 1, teamplay: 2, utility: 3 } },
    { name: "Waylay", role: "Duelist", image: "images/waylay.jpeg", scores: { aggressive: 3, stealth: 1, teamplay: 2, utility: 1 } }
];

// Soru eşleştirmeleri (Bu kısımda değişiklik yok)
const questionMapping = {
    "q1": { "agresif": "aggressive", "defansif": "stealth", "destek": "teamplay" },
    "q2": { "yetenek": "utility", "silah": "aggressive", "denge": "teamplay" },
    "q3": { "kontrol": "teamplay", "giris": "aggressive", "info": "utility" },
    "q4": { "kontrol": "aggressive", "giris": "stealth", "info": "teamplay" },
    "q5": { "kontrol": "stealth", "giris": "aggressive", "info": "utility" },
    "q6": { "kontrol": "utility", "giris": "aggressive", "info": "teamplay" }
};

// DOM Elementleri
const quizForm = document.getElementById('quizForm');
const questions = document.querySelectorAll('.question');
const resultDiv = document.getElementById('result');
const agentResultsDiv = document.getElementById('agentResults');
const progressBar = document.getElementById('progressBar');
const nextButtons = document.querySelectorAll('.next-btn');
const submitButton = document.getElementById('submitBtn'); // submitBtn id'sini kullandık

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
        alert(translations[currentLang].alertMessage);
        return;
    }

    currentQuestion.style.display = 'none';
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        questions[currentQuestionIndex].style.display = 'block';
        updateProgressBar();
    }
}

// Ajanları puanla ve sırala (Bu kısımda değişiklik yok)
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

// Sonuçları göster (Bu kısımda değişiklik yok)
function showResults() {
    const answers = {};
    
    questions.forEach((question, index) => {
        const selected = question.querySelector(`input[name="q${index + 1}"]:checked`);
        if (selected) {
            const category = questionMapping[`q${index + 1}`][selected.value];
            answers[category] = (answers[category] || 0) + 1;
        }
    });

    const topAgents = scoreAgents(answers);

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
    changeLanguage(currentLang); // Yeniden başlatırken mevcut dili uygula
}

// Event Listeners
nextButtons.forEach(btn => {
    btn.addEventListener('click', goToNextQuestion);
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.querySelector('input:checked');
    if (!selectedAnswer) {
        alert(translations[currentLang].alertMessage);
        return;
    }
    showResults();
});

// Sayfa yüklendiğinde ilk soruyu göster ve dili ayarla
document.addEventListener('DOMContentLoaded', () => {
    questions[0].style.display = 'block';
    updateProgressBar();
    changeLanguage('tr'); // Sayfa yüklendiğinde varsayılan olarak Türkçe başlat
});
