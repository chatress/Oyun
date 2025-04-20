const questions = [
    {
        question: "Oyun tarzınız genellikle nasıl?",
        options: ["Saklanarak ve pusu kurarak", "Agresif ve öne atılarak", "Takımı destekleyerek"],
        weights: [
            { sage: 2, cypher: 3, killjoy: 3, omen: 1, viper: 1, brimstone: 1, sova: 1, breach: 1, phoenix: 1, reyna: 0, jett: 0, raze: 0, skye: 2, yoru: 1, astra: 2, kayeo: 1, chamber: 2, neon: 0, fade: 2, harbor: 2 },
            { sage: 0, cypher: 0, killjoy: 0, omen: 2, viper: 2, brimstone: 2, sova: 2, breach: 3, phoenix: 3, reyna: 3, jett: 3, raze: 3, skye: 1, yoru: 3, astra: 1, kayeo: 3, chamber: 1, neon: 3, fade: 1, harbor: 1 },
            { sage: 3, cypher: 1, killjoy: 1, omen: 3, viper: 3, brimstone: 3, sova: 3, breach: 2, phoenix: 2, reyna: 1, jett: 1, raze: 1, skye: 3, yoru: 2, astra: 3, kayeo: 2, chamber: 1, neon: 1, fade: 3, harbor: 3 }
        ]
    },
    {
        question: "Çatışmalarda neye daha çok önem verirsiniz?",
        options: ["Doğrudan çatışmaya girmek (düello)", "Alan kontrolü ve savunma", "Takım arkadaşlarına yardımcı olmak ve bilgi toplamak"],
        weights: [
            { sage: 0, cypher: 0, killjoy: 0, omen: 2, viper: 2, brimstone: 2, sova: 2, breach: 3, phoenix: 3, reyna: 3, jett: 3, raze: 3, skye: 1, yoru: 3, astra: 1, kayeo: 3, chamber: 3, neon: 3, fade: 1, harbor: 1 },
            { sage: 3, cypher: 3, killjoy: 3, omen: 1, viper: 3, brimstone: 3, sova: 1, breach: 1, phoenix: 0, reyna: 0, jett: 0, raze: 0, skye: 2, yoru: 1, astra: 3, kayeo: 1, chamber: 3, neon: 0, fade: 3, harbor: 3 },
            { sage: 3, cypher: 2, killjoy: 2, omen: 3, viper: 1, brimstone: 1, sova: 3, breach: 2, phoenix: 2, reyna: 1, jett: 1, raze: 1, skye: 3, yoru: 2, astra: 3, kayeo: 2, chamber: 1, neon: 1, fade: 3, harbor: 3 }
        ]
    },
    // ... Diğer sorular buraya eklenecek
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
const nextButton = document.getElementById('next-button');
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
    nextButton.style.display = 'none';
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
    nextButton.style.display = 'block';
    showQuestion();
}

nextButton.addEventListener('click', () => {
    const selectedOption = questionContainer.querySelector('.options button.selected');
    if (selectedOption) {
        // Burada seçilen cevabı işle
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    } else {
        alert("Lütfen bir seçenek seçin.");
    }
});

// Basit bir "ileri" butonu yerine, her seçeneğe tıklanınca bir sonraki soruya geçiş mantığı eklendi
function setupQuestionNavigation() {
    const optionsContainers = document.querySelectorAll('#question-container .options');
    optionsContainers.forEach(container => {
        const buttons = container.querySelectorAll('button');
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                selectAnswer(index);
            });
        });
    });
}

restartButton.addEventListener('click', restartQuiz);

showQuestion();
// İlk soruyu yükle
setupQuestionNavigation(); // Başlangıçta olay dinleyicilerini ayarla
