// Quiz creator functionality
const quizCreator = document.getElementById('quiz-creator');
const questionsContainer = document.getElementById('questions-container');
const addQuestionBtn = document.getElementById('add-question');
const saveQuizBtn = document.getElementById('save-quiz');
const quizTitle = document.getElementById('quiz-title');

// Quiz taker functionality
const quizTaker = document.getElementById('quiz-taker');
const quizSelector = document.getElementById('quiz-selector');
const quizQuestions = document.getElementById('quiz-questions');
const submitQuizBtn = document.getElementById('submit-quiz');
const quizResults = document.getElementById('quiz-results');

let quizzes = [];

// Show/Hide sections
document.getElementById('create-quiz-button').addEventListener('click', function() {
    quizCreator.classList.toggle('hidden');
    quizTaker.classList.add('hidden');
});

document.getElementById('take-quiz-button').addEventListener('click', function() {
    quizTaker.classList.toggle('hidden');
    quizCreator.classList.add('hidden');
});

// Add question to quiz creator
function addQuestion() {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
        <input type="text" class="question-text" placeholder="Question">
        <input type="text" class="option" placeholder="Option 1">
        <input type="text" class="option" placeholder="Option 2">
        <input type="text" class="option" placeholder="Option 3">
        <input type="text" class="option" placeholder="Option 4">
        <select class="correct-answer">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </select>
    `;
    questionsContainer.appendChild(questionDiv);
}

// Save quiz
function saveQuiz() {
    const title = quizTitle.value;
    const questions = [];
    document.querySelectorAll('.question').forEach(questionDiv => {
        const questionText = questionDiv.querySelector('.question-text').value;
        const options = Array.from(questionDiv.querySelectorAll('.option')).map(option => option.value);
        const correctAnswer = questionDiv.querySelector('.correct-answer').value;
        questions.push({ questionText, options, correctAnswer });
    });
    quizzes.push({ title, questions });
    updateQuizSelector();
    alert('Quiz saved successfully!');
}

// Update quiz selector
function updateQuizSelector() {
    quizSelector.innerHTML = '<option value="">Select a quiz</option>';
    quizzes.forEach((quiz, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = quiz.title;
        quizSelector.appendChild(option);
    });
}

// Load selected quiz
function loadQuiz() {
    const selectedQuizIndex = quizSelector.value;
    if (selectedQuizIndex !== '') {
        const quiz = quizzes[selectedQuizIndex];
        quizQuestions.innerHTML = '';
        quiz.questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `
                <p>${index + 1}. ${question.questionText}</p>
                <div class="options">
                    ${question.options.map((option, i) => `
                        <label>
                            <input type="radio" name="q${index}" value="${i + 1}">
                            ${option}
                        </label>
                    `).join('')}
                </div>
            `;
            quizQuestions.appendChild(questionDiv);
        });
        submitQuizBtn.style.display = 'block';
    } else {
        quizQuestions.innerHTML = '';
        submitQuizBtn.style.display = 'none';
    }
}

// Submit quiz
function submitQuiz() {
    const selectedQuizIndex = quizSelector.value;
    const quiz = quizzes[selectedQuizIndex];
    let score = 0;
    quiz.questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === question.correctAnswer) {
            score++;
        }
    });
    quizResults.textContent = `You scored ${score} out of ${quiz.questions.length}`;
}

// Event listeners
addQuestionBtn.addEventListener('click', addQuestion);
saveQuizBtn.addEventListener('click', saveQuiz);
quizSelector.addEventListener('change', loadQuiz);
submitQuizBtn.addEventListener('click', submitQuiz);

// Initialize with one question
addQuestion();
