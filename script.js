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
    "q1": { "agresif": "aggressive", "defansif": "stealth", "destek": "teamplay" },
    "q2": { "yetenek": "utility", "silah": "aggressive", "denge": "teamplay" },
    "q3": { "kontrol": "teamplay", "giris": "aggressive", "info": "utility" }
};

const quizForm = document.getElementById('quizForm');
const questions = document.querySelectorAll('.question');
const resultDiv = document.getElementById('result');
const agentResultsDiv = document.getElementById('agentResults');
const submitButton = document.querySelector('button[type="submit"]');
const restartButton = document.querySelector('#result button');

let currentQuestionIndex = 0;
const questionCount = questions.length;
let nextButton; // Tanımı yukarı taşıdık

// Başlangıçta sadece ilk soruyu göster
questions[0].style.display = 'block';

// İlk "Sonraki" butonunu oluştur ve ilk sorunun altına ekle
function createNextButton() {
    const btn = document.createElement('button');
    btn.textContent = 'Sonraki';
    questions[currentQuestionIndex].appendChild(btn);
    return btn;
}

nextButton = createNextButton();

nextButton.addEventListener('click', () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.querySelector('input:checked');

    if (!selectedAnswer) {
        alert('Lütfen bir cevap seçin.');
        return;
    }

    currentQuestion.style.display = 'none';
    currentQuestionIndex++;

    if (currentQuestionIndex < questionCount - 1) {
        questions[currentQuestionIndex].style.display = 'block';
        nextButton = createNextButton(); // Yeni butonu oluştur
        nextButton.addEventListener('click', arguments.callee); // Olay dinleyicisini tekrar ata
    } else if (currentQuestionIndex === questionCount - 1) {
        questions[currentQuestionIndex].style.display = 'block';
        submitButton.style.display = 'block'; // Son soruda "Ajanları Öner" butonunu göster
        nextButton.remove(); // Önceki "Sonraki" butonunu kaldır
    }
});

quizForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const answers = {};
    for (let qid in questionMapping) {
        const selected = document.querySelector(`input[name="${qid}"]:checked`);
        if (selected) {
            const category = questionMapping[qid][selected.value];
            answers[category] = (answers[category] || 0) + 1;
        }
    }

    const topAgents = scoreAgents(answers);

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

    resultDiv.classList.remove('hidden');
    quizForm.style.display = 'none';
});

function restartQuiz() {
    currentQuestionIndex = 0;
    questions.forEach(question => {
        question.style.display = 'none';
        // Önceki "Sonraki" butonlarını temizle
        const existingNextButton = question.querySelector('button:not([type="submit"])');
        if (existingNextButton) {
            existingNextButton.remove();
        }
    });
    questions[0].style.display = 'block';
    nextButton = createNextButton(); // Yeni "Sonraki" butonunu oluştur
    nextButton.addEventListener('click', () => {
        let currentQuestion = questions[currentQuestionIndex];
        let selectedAnswer = currentQuestion.querySelector('input:checked');

        if (!selectedAnswer) {
            alert('Lütfen bir cevap seçin.');
            return;
        }

        currentQuestion.style.display = 'none';
        currentQuestionIndex++;

        if (currentQuestionIndex < questionCount - 1) {
            questions[currentQuestionIndex].style.display = 'block';
            nextButton = createNextButton();
            nextButton.addEventListener('click', arguments.callee);
        } else if (currentQuestionIndex === questionCount - 1) {
            questions[currentQuestionIndex].style.display = 'block';
            submitButton.style.display = 'block';
            nextButton.remove();
        }
    });
    resultDiv.classList.add('hidden');
    quizForm.style.display = 'block';
    submitButton.style.display = 'none';
}

// Başlangıçta "Ajanları Öner" butonunu gizle
submitButton.style.display = 'none';
