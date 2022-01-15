var startQuizBtnEl = document.getElementById('startQuizBtn');
var questionEL = document.getElementById('question');
var answersEl = document.getElementById('answers');
var timeRemainingEl = document.getElementById('timeRemaining');
var timerEl = document.getElementById('timer');
var scoresFormEl = document.getElementById('scoresForm');
var submitScoreBtnEl = document.getElementById('submitScoreBtn');
var initialsInput = document.getElementById('initials');
var highScoresLinkEl = document.getElementById('highscores');
var highScoresCont = document.getElementById('highscoresContainer');
var backToStartEl = document.getElementById('refreshBtn');
var clearHighscoresEl = document.getElementById('clearBtn');
var containerEl = document.getElementById('container');
var correctEl = document.getElementById('correct');
var incorrectEl = document.getElementById('incorrect');

var questions = [
  {
    question: 'Commonly used data types DO NOT include:',
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
    question: 'String values must be enclosed within ____ when being assigned to variables.',
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
var timeRemaining = 50;

// this function displays the time remaining
function updateTimeRemainingEl() {
  timeRemainingEl.textContent = timeRemaining;
}
// this function is to start counting down the timer and end game if it reaches 0
function startTimer() {
  var timer = setInterval(function () {
    if (questionIndex >= questions.length) {
      clearInterval(timer);
    }
    if (timeRemaining <= 0) {
      timeRemaining = 0;
      endGame();
      clearInterval(timer);
    }
    timeRemaining--;
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

// function to check if users answer is not the same as the correct answer, if it is not the same then 10 seconds are deducted from the timer/score
function checkAnswer(userAnswer) {
  var correctAnswer = questions[questionIndex].correctAnswer;
  console.log(correctAnswer);
  if (userAnswer != correctAnswer) {
    if (timeRemaining > 10) {
      timeRemaining -= 10;
    } else {
      timeRemaining = 0;
    }
    updateTimeRemainingEl();
    incorrectEl.classList.remove('hide');
    correctEl.classList.add('hide');
  } else {
    incorrectEl.classList.add('hide');
    correctEl.classList.remove('hide');
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
  questionEL.textContent = 'You finished the quiz! Your final score is ' + timeRemaining;
  answersEl.classList.add('hide');
  timerEl.classList.add('hide');
  scoresFormEl.classList.add('show');
  correctEl.classList.add('hide');
  incorrectEl.classList.add('hide');
}

// creating an empty highScores array from localstorage if the user has no highscores stored
var highScores = JSON.parse(localStorage.getItem('highScores'));

if (!highScores) {
  highScores = [];
}
// function to submit score to the highscores leaderboard once entered initials clicked the "submit score" button
function submitScore(event) {
  event.preventDefault();
  if (!initialsInput.value) {
    alert('Please enter your initials');
    return;
  }
  questionEL.textContent = '';
  scoresFormEl.classList.remove('show');
  var userScore = {
    userInitials: initialsInput.value,
    score: (timeRemaining += 1),
  };

  highScores.push(userScore);
  localStorage.setItem('highScores', JSON.stringify(highScores));
  showHighScores();
}

// function to show highScores leaderboard in order (highest to lowest)
function showHighScores() {
  highScoresCont.classList.remove('hide');
  highScoresCont.innerHTML = '';
  timerEl.innerHTML = '';
  timeRemainingEl.innerHTML = '';
  answersEl.innerHTML = '';
  questionEL.innerHTML = '';
  highScoresLinkEl.classList.add('hide');
  startQuizBtnEl.classList.add('hide');
  backToStartEl.classList.remove('hide');
  clearHighscoresEl.classList.remove('hide');
  containerEl.classList.add('hide');
  function scoreSorting(a, b) {
    return b.score - a.score;
  }
  highScores.sort(scoreSorting);
  var highscoresTitle = document.createElement('h2');
  highscoresTitle.textContent = 'Highscores';
  highScoresCont.append(highscoresTitle);
  var orderedList = document.createElement('ol');
  for (var i = 0; i < highScores.length && i < 10; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = createHighScoreString(highScores[i]);
    orderedList.append(listItem);
  }
  highScoresCont.append(orderedList);
}

// function to clear highScores and refresh page
function clearHighScores() {
  localStorage.clear();
  location.reload();
}

// function that takes the userScore object and returns a string
function createHighScoreString(highScore) {
  return highScore.userInitials.trim() + ' ------------- ' + highScore.score;
}

// event listener to run the startQuiz function when the button is clicked
startQuizBtnEl.addEventListener('click', startQuiz);
// event listener to run the nextQuestion function when an answer is clicked
answersEl.addEventListener('click', nextQuestion);
// event listener to run the submitScore function when the button is clicked
submitScoreBtnEl.addEventListener('click', submitScore);
// event listener to run the showHighScores function when the link is clicked
highScoresLinkEl.addEventListener('click', showHighScores);
// event listener to run the clearHighScores function when the link is clicked
clearHighscoresEl.addEventListener('click', clearHighScores);
