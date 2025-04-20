const questions = [
    {
        question: "Oyun tarzınız genellikle nasıl?",
        options: ["Saklanarak ve pusu kurarak, ani baskınlarla", "Agresif ve sürekli çatışma arayarak", "Takımı destekleyerek, alan kontrolü sağlayarak", "Bilgi toplayarak ve takımın stratejisini yönlendirerek"],
        weights: [
            { brimstone: 1, viper: 1, omen: 2, killjoy: 3, cypher: 3, sova: 1, sage: 2, phoenix: 2, jett: 2, reyna: 2, raze: 2, breach: 2, skye: 2, yoru: 3, astra: 1, kayeo: 1, chamber: 3, neon: 1, fade: 2, harbor: 1 }, // Saklanarak/Pusu
            { brimstone: 2, viper: 2, omen: 2, killjoy: 0, cypher: 0, sova: 2, sage: 1, phoenix: 3, jett: 3, reyna: 3, raze: 3, breach: 3, skye: 2, yoru: 2, astra: 1, kayeo: 3, chamber: 1, neon: 3, fade: 1, harbor: 1 }, // Agresif
            { brimstone: 3, viper: 3, omen: 3, killjoy: 3, cypher: 2, sova: 2, sage: 3, phoenix: 1, jett: 1, reyna: 1, raze: 1, breach: 2, skye: 3, yoru: 1, astra: 3, kayeo: 2, chamber: 1, neon: 1, fade: 3, harbor: 3 }, // Destek/Kontrol
            { brimstone: 2, viper: 2, omen: 3, killjoy: 2, cypher: 3, sova: 3, sage: 2, phoenix: 1, jett: 1, reyna: 1, raze: 1, breach: 2, skye: 3, yoru: 2, astra: 3, kayeo: 2, chamber: 2, neon: 1, fade: 3, harbor: 3 }  // Bilgi/Yönlendirme
        ]
    },
    {
        question: "Çatışmalarda önceliğiniz ne olur?",
        options: ["Doğrudan rakiple düelloya girmek ve onları alt etmek", "Güvenli bir mesafeden hasar vermek ve alanı kontrol etmek", "Takım arkadaşlarımı korumak ve onlara can/destek sağlamak", "Rakip hakkında bilgi toplamak ve takımın ilerlemesine yardımcı olmak"],
        weights: [
            { brimstone: 2, viper: 2, omen: 2, killjoy: 0, cypher: 0, sova: 1, sage: 1, phoenix: 3, jett: 3, reyna: 3, raze: 3, breach: 3, skye: 2, yoru: 3, astra: 1, kayeo: 3, chamber: 2, neon: 3, fade: 1, harbor: 1 }, // Düello
            { brimstone: 3, viper: 3, omen: 3, killjoy: 3, cypher: 2, sova: 2, sage: 2, phoenix: 2, jett: 2, reyna: 2, raze: 2, breach: 2, skye: 2, yoru: 2, astra: 3, kayeo: 2, chamber: 3, neon: 2, fade: 3, harbor: 3 }, // Alan Kontrol/Hasar
            { brimstone: 1, viper: 1, omen: 1, killjoy: 2, cypher: 1, sova: 2, sage: 3, phoenix: 1, jett: 1, reyna: 1, raze: 1, breach: 1, skye: 3, yoru: 1, astra: 2, kayeo: 1, chamber: 1, neon: 1, fade: 2, harbor: 2 }, // Destek/Koruma
            { brimstone: 2, viper: 2, omen: 3, killjoy: 3, cypher: 3, sova: 3, sage: 2, phoenix: 1, jett: 1, reyna: 1, raze: 1, breach: 2, skye: 3, yoru: 2, astra: 3, kayeo: 2, chamber: 2, neon: 1, fade: 3, harbor: 3 }  // Bilgi Toplama
        ]
    },
    {
        question: "Haritalarda nasıl bir rol üstlenmeyi tercih edersiniz?",
        options: ["Ön saflarda yer alıp ilk giren olmak", "Orta alanda kontrolü sağlamak ve rotasyonları yönetmek", "Arka hatta kalıp savunmayı güçlendirmek ve takım arkadaşlarımı desteklemek", "Sürpriz saldırılar yapmak ve rakip hatlarını yarmak"],
        weights: [
            { brimstone: 2, viper: 2, omen: 2, killjoy: 0, cypher: 0, sova: 2, sage: 1, phoenix: 3, jett: 3, reyna: 3, raze: 3, breach: 3, skye: 2, yoru: 2, astra: 1, kayeo: 3, chamber: 1, neon: 3, fade: 1, harbor: 1 }, // Ön Saf
            { brimstone: 3, viper: 3, omen: 3, killjoy: 1, cypher: 2, sova: 3, sage: 2, phoenix: 2, jett: 2, reyna: 2, raze: 2, breach: 2, skye: 3, yoru: 2, astra: 3, kayeo: 2, chamber: 2, neon: 2, fade: 3, harbor: 3 }, // Orta Alan Kontrolü
            { brimstone: 3, viper: 3, omen: 2, killjoy: 3, cypher: 3, sova: 2, sage: 3, phoenix: 1, jett: 1, reyna: 1, raze: 1, breach: 1, skye: 2, yoru: 1, astra: 3, kayeo: 3, chamber: 3, neon: 1, fade: 2, harbor: 3 }, // Arka Hat/Savunma
            { brimstone: 1, viper: 1, omen: 3, killjoy: 0, cypher: 0, sova: 2, sage: 1, phoenix: 2, jett: 3, reyna: 2, raze: 3, breach: 2, skye: 2, yoru: 3, astra: 1, kayeo: 1, chamber: 2, neon: 3, fade: 3, harbor: 1 }  // Sürpriz Saldırı/Yarma
        ]
    },
    {
        question: "Yeteneklerinizi kullanırken önceliğiniz nedir?",
        options: ["Rakip öldürmek veya onlara doğrudan hasar vermek", "Alanları kontrol etmek, geçişleri engellemek veya güvenli alanlar oluşturmak", "Takım arkadaşlarımı iyileştirmek, güçlendirmek veya görüş sağlamak", "Rakip konumları hakkında bilgi toplamak ve onları zayıflatmak"],
        weights: [
            { brimstone: 2, viper: 2, omen: 2, killjoy: 0, cypher: 0, sova: 0, sage: 0, phoenix: 3, jett: 2, reyna: 3, raze: 3, breach: 3, skye: 1, yoru: 2, astra: 1, kayeo: 3, chamber: 1, neon: 3, fade: 2, harbor: 1 }, // Hasar/Öldürme
            { brimstone: 3, viper: 3, omen: 3, killjoy: 3, cypher: 3, sova: 2, sage: 2, phoenix: 1, jett: 1, reyna: 1, raze: 1, breach: 2, skye: 2, yoru: 2, astra: 3, kayeo: 2, chamber: 3, neon: 1, fade: 3, harbor: 3 }, // Alan Kontrol/Güvenlik
            { brimstone: 1, viper: 1, omen: 1, killjoy: 2, cypher: 2, sova: 3, sage: 3, phoenix: 2, jett: 1, reyna: 1, raze: 1, breach: 2, skye: 3, yoru: 1, astra: 2, kayeo: 2, chamber: 1, neon: 1, fade: 3, harbor: 3 }, // Destek/Görüş
            { brimstone: 2, viper: 2, omen: 3, killjoy: 3, cypher: 3, sova: 3, sage: 2, phoenix: 1, jett: 1, reyna: 1, raze: 1, breach: 2, skye: 3, yoru: 2, astra: 3, kayeo: 2, chamber: 2, neon: 1, fade: 3, harbor: 3 }  // Bilgi/Zayıflatma
        ]
    },
    {
        question: "Hangi tür silahlarda daha yeteneklisiniz?",
        options: ["Keskin nişancı tüfekleri (Sniper)", "Piyade tüfekleri (Rifle)", "Hafif makineli tüfekler (SMG) ve pompalı tüfekler (Shotgun)", "Tabancalar (Pistol)"],
        weights: [
            { brimstone: 1, viper: 1, omen: 1, killjoy: 3, cypher: 3, sova: 3, sage: 3, phoenix: 1, jett: 3, reyna: 1, raze: 1, breach: 1, skye: 2, yoru: 2, astra: 2, kayeo: 2, chamber: 3, neon: 1, fade: 2, harbor: 2 }, // Sniper (Jett, Chamber, Sova, Cypher, Killjoy, Sage)
            { brimstone: 3, viper: 3, omen: 3, killjoy: 2, cypher: 2, sova: 2, sage: 2, phoenix: 3, jett: 2, reyna: 3, raze: 3, breach: 3, skye: 3, yoru: 3, astra: 3, kayeo: 3, chamber: 2, neon: 3, fade: 3, harbor: 3 }, // Rifle (Çoğu Ajan)
            { brimstone: 2, viper: 2, omen: 2, killjoy: 1, cypher: 1, sova: 1, sage: 1, phoenix: 3, jett: 3, reyna: 3, raze: 3, breach: 3, skye: 3, yoru: 3, astra: 2, kayeo: 2, chamber: 1, neon: 3, fade: 2, harbor: 2 }, // SMG/Shotgun (Hızlı ve Yakın Mesafe)
            { brimstone: 2, viper: 2, omen: 2, killjoy: 2, cypher: 2, sova: 2, sage: 2, phoenix: 2, jett: 2, reyna: 2, raze: 2, breach: 2, skye: 2, yoru: 2, astra: 2, kayeo: 2, chamber: 2, neon: 2, fade: 2, harbor: 2 }  // Pistol (Herkes için geçerli)
        ]
    }
    // İstediğiniz kadar soru ekleyebilirsiniz...
];

const agents = [
    "Brimstone", "Viper", "Omen", "Killjoy", "Cypher", "Sova", "Sage", "Phoenix", "Jett", "Reyna", "Raze", "Breach", "Skye", "Yoru", "Astra", "KAY/O", "Chamber", "Neon", "Fade", "Harbor"
];

let currentQuestionIndex = 0;
let agentScores = {};

agents.forEach(agent => {
    agentScores[agent] = 0;
});

const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const topAgentsContainer = document.getElementById('top-agents');
const restartButton = document.getElementById('restart-button');

function showQuestion() {
    questionContainer.innerHTML = '';
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.textContent = currentQuestion.question;

    const optionsElement = document.createElement('div');
    optionsElement.classList.add('options');

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        optionsElement.appendChild(button);
    });

    questionElement.appendChild(optionsElement);
    questionContainer.appendChild(questionElement);
}

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const weights = currentQuestion.weights[selectedIndex];
    for (const agent in weights) {
        if (agentScores.hasOwnProperty(agent)) {
            agentScores[agent] += weights[agent];
        }
    }
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    const sortedAgents = Object.entries(agentScores)
        .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
        .slice(0, 3);

    topAgentsContainer.innerHTML = '';
    sortedAgents.forEach((agent, index) => {
        const agentDiv = document.createElement('div');
        agentDiv.classList.add('agent');
        agentDiv.innerHTML = `
            <h3>${index + 1}. ${agent[0]}</h3>
            <p>Bu ajanın oyun tarzınıza uygun olabileceği düşünülüyor.</p>
        `;
        topAgentsContainer.appendChild(agentDiv);
    });
}

function restartQuiz() {
    currentQuestionIndex = 0;
    agentScores = {};
    agents.forEach(agent => {
        agentScores[agent] = 0;
    });
    resultContainer.style.display = 'none';
    questionContainer.style.display = 'block';
    showQuestion();
}

restartButton.addEventListener('click', restartQuiz);

showQuestion();
