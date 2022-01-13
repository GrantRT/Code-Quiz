var startQuizBtnEl = document.getElementById('startQuiz');
var questionEL = document.getElementById('question');
var answersEl = document.getElementById('answers');
var timeRemainingEl = document.getElementById('timeRemaining');

var questions = [
  {
    question: 'Commonnly used data types DO NOT include:',
    answers: ['booleans', 'strings', 'numbers', 'alerts'],
    correctAnswer: 'alerts',
  },
  {
    question: 'The condition in an if/else statement is enclosed within ____.',
    answers: ['quotes', 'square brackets', 'parentheses', 'curly brackets'],
    correctAnswer: 'parentheses',
  },
  {
    question: 'Arrays in JavaScript can be used to store ____.',
    answers: ['booleans', 'numbers and strings', 'other arrays', 'all of the above'],
    correctAnswer: 'all of the above',
  },
  {
    question: 'String values must be enclosed within ____ when being assinged to variables.',
    answers: ['curly brackets', 'quotes', 'parenthesis', 'commas'],
    correctAnswer: 'quotes',
  },
  {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    answers: ['JavaScript', 'for loops', 'console.log', 'terminal/bash'],
    correctAnswer: 'console.log',
  },
];

var questionIndex = -1;
var timeRemaining = 100;

function updateTimeRemainingEl() {
  timeRemainingEl.textContent = timeRemaining;
}
// this function is to start counting down the timer and end game if it reaches 0
function startTimer() {
  var timer = setInterval(function () {
    timeRemaining--;
    if (timeRemaining <= 0) {
      endGame();
      clearInterval(timer);
    }
    updateTimeRemainingEl();
  }, 1000);
}

function startQuiz() {
  startQuizBtnEl.classList.add('hide');
  updateTimeRemainingEl();
  startTimer();
  nextQuestion();
}

answersEl.addEventListener('click', nextQuestion);

function checkAnswer(userAnswer) {
  var correctAnswer = questions[questionIndex].correctAnswer;
  console.log(correctAnswer);
  if (userAnswer != correctAnswer) {
    timeRemaining -= 10;
    updateTimeRemainingEl();
  }
}

function nextQuestion(event) {
  if (event) {
    var userChoice = event.target.textContent;
    checkAnswer(userChoice);
  }
  questionIndex++;
  if (questionIndex >= questions.length) {
    endGame();
    return;
  }
  var currentQuestion = questions[questionIndex];
  questionEL.textContent = currentQuestion.question;
  updateAnswersUi();
}

function updateAnswersUi() {
  answersEl.innerHTML = '';
  var orderedList = document.createElement('ol');
  var currentAnswers = questions[questionIndex].answers;
  for (var i = 0; i < currentAnswers.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = currentAnswers[i];
    orderedList.append(listItem);
  }
  answersEl.append(orderedList);
}

function endGame() {
  questionEL.textContent = 'You finished the quiz!';
  answersEl.classList.add('hide');
}

startQuizBtnEl.addEventListener('click', startQuiz);
