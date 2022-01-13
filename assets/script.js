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

// this function begins the quiz and starts the timer at the click of the button
function startQuiz() {
  startQuizBtnEl.classList.add('hide');
  updateTimeRemainingEl();
  startTimer();
  nextQuestion();
}

// event listener to run the nextQuestion function when an answer is clicked
answersEl.addEventListener('click', nextQuestion);

// function to check if users answer is not the same as the correct answer, if it is not the same then 10 seconds are deducted from the timer/score
function checkAnswer(userAnswer) {
  var correctAnswer = questions[questionIndex].correctAnswer;
  console.log(correctAnswer);
  if (userAnswer != correctAnswer) {
    timeRemaining -= 10;
    updateTimeRemainingEl();
  }
}

// this function displays the next question when an answer is selcted from the current question
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

// this function creates an ordered list of the individual answers so that I can specify which answer was clicked
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

// function to end the game
function endGame() {
  questionEL.textContent = 'You finished the quiz!';
  answersEl.classList.add('hide');
}

// event listener to run the startQuiz function when the start quiz button is clicked
startQuizBtnEl.addEventListener('click', startQuiz);
