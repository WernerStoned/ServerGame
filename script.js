const startButton = document.getElementById("startButton");
const quizSelection = document.getElementById("quizSelection");
const quizSelect = document.getElementById("quizSelect");
const quizArea = document.getElementById("quizArea");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const bgMusic = document.getElementById("bgMusic");
const volumeSlider = document.getElementById("volumeSlider");

let quizzes = [];

let currentQuizIndex = 0;
let score = 0;

startButton.addEventListener("click", startQuiz);

function loadQuestions() {
  fetch('
https://github.com/WernerStoned/ServerGame/blob/main/questions.json') // Lade die Fragen aus der JSON-Datei
    .then(response => response.json())
    .then(data => {
      quizzes = data; // Speichere die geladenen Fragen im quizzes-Array
    })
    .catch(error => {
      console.error('Fehler beim Laden der Fragen:', error);
    });
}

function startQuiz() {
  loadQuestions(); // Lade die Fragen aus der JSON-Datei
  const selectedQuizIndex = parseInt(quizSelect.value);
  const selectedQuiz = quizzes[selectedQuizIndex];
  
  quizSelection.style.display = "none";
  quizArea.style.display = "block";
  bgMusic.volume = volumeSlider.value;
  bgMusic.play();
  quizzes = selectedQuiz.questions; // Aktualisiere das Quiz mit den ausgewählten Fragen
  displayQuiz();
}

volumeSlider.addEventListener("input", () => {
  bgMusic.volume = volumeSlider.value;
});

function displayQuiz() {
  if (currentQuizIndex < quizzes.length) {
    const currentQuiz = quizzes[currentQuizIndex];
    questionElement.textContent = currentQuiz.question;
    optionsElement.innerHTML = "";

    currentQuiz.options.forEach((option, index) => {
      const optionButton = document.createElement("button");
      optionButton.textContent = option;
      optionButton.addEventListener("click", () => checkAnswer(index));
      optionsElement.appendChild(optionButton);
    });
  } else {
    endQuiz();
  }
}

function checkAnswer(selectedIndex) {
  const currentQuiz = quizzes[currentQuizIndex];
  if (selectedIndex === currentQuiz.correctOption) {
    score++;
  }
  currentQuizIndex++;
  displayQuiz();
}

function endQuiz() {
  quizArea.innerHTML = `<h2>Quiz beendet</h2><p>Deine Punktzahl: ${score} von ${quizzes.length}</p>`;
  bgMusic.pause();
}
