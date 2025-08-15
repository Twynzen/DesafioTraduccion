// Lista de palabras para el quiz y sus traducciones al español
const words = [
  { english: 'apple', spanish: 'manzana' },
  { english: 'cat', spanish: 'gato' },
  { english: 'book', spanish: 'libro' },
  { english: 'house', spanish: 'casa' },
  { english: 'water', spanish: 'agua' }
];

let currentIndex = 0;
let score = 0;

// Elementos del DOM
const startBtn = document.getElementById('startBtn');
const welcomeDiv = document.getElementById('welcome');
const quizDiv = document.getElementById('quiz');
const resultDiv = document.getElementById('result');
const promptEl = document.getElementById('prompt');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const scoreMsg = document.getElementById('scoreMsg');
const restartBtn = document.getElementById('restartBtn');

// Función para normalizar cadenas y así compararlas ignorando mayúsculas y acentos
function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

// Muestra la palabra actual del quiz
function showQuestion() {
  const word = words[currentIndex];
  promptEl.textContent = `Traduce al español: ${word.english}`;
  answerInput.value = '';
  feedbackEl.textContent = '';
  feedbackEl.className = '';
  nextBtn.classList.add('hidden');
}

// Evento para iniciar el quiz
startBtn.addEventListener('click', () => {
  currentIndex = 0;
  score = 0;
  welcomeDiv.classList.add('hidden');
  resultDiv.classList.add('hidden');
  quizDiv.classList.remove('hidden');
  showQuestion();
});

// Evento para enviar la traducción ingresada
submitBtn.addEventListener('click', () => {
  const userAns = normalize(answerInput.value.trim());
  const correctAns = normalize(words[currentIndex].spanish);
  if (userAns === correctAns && userAns !== '') {
    feedbackEl.textContent = 'Correcto';
    feedbackEl.className = 'correct';
    score++;
  } else {
    feedbackEl.textContent = `Incorrecto. Traducción correcta: ${words[currentIndex].spanish}`;
    feedbackEl.className = 'incorrect';
  }
  // Mostrar el botón siguiente
  nextBtn.classList.remove('hidden');
});

// Evento para pasar a la siguiente palabra
nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < words.length) {
    showQuestion();
  } else {
    // Si ya no hay más palabras, mostrar resultado
    quizDiv.classList.add('hidden');
    resultDiv.classList.remove('hidden');
    scoreMsg.textContent = `Acertaste ${score} de ${words.length} traducciones.`;
  }
});

// Evento para reiniciar todo y volver al inicio
restartBtn.addEventListener('click', () => {
  resultDiv.classList.add('hidden');
  welcomeDiv.classList.remove('hidden');
});