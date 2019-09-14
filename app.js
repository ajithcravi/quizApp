
// Switching
let displayOne = document.getElementsByClassName("displayOne");
let displayTwo = document.getElementsByClassName("displayTwo");
let displayThree = document.getElementsByClassName("displayThree");
let displayQuestion = document.getElementsByClassName("displayQuestion");

function switchDiv(flag){
  switch (flag) {
    case 2:
      displayOne[0].style.display = "none";
      displayTwo[0].style.display = "block";
      break;

    case 3:
      displayTwo[0].style.display = "none";
      displayThree[0].style.display = "block";
      break;

    case 4:
      displayThree[0].style.display = "none";
      displayQuestion[0].style.display = "block";
      break;
  }
}




// Navigation Bar
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


// Timer
//set minutes
var mins = 10;
//calculate the seconds
var secs = mins * 60;
//countdown function is evoked when page is loaded
function countdown() {
    setTimeout('Decrement()', 60);
}
//Decrement function decrement the value.
function Decrement() {
    if (document.getElementById) {
        minutes = document.getElementById("minutes");
        seconds = document.getElementById("seconds");
        //if less than a minute remaining
        //Display only seconds value.
        if (seconds < 59) {
            seconds.value = secs;
        }
        //Display both minutes and seconds
        //getminutes and getseconds is used to
        //get minutes and seconds
        else {
            minutes.value = getminutes();
            seconds.value = getseconds();
        }
        //when less than a minute remaining
        //colour of the minutes and seconds
        //changes to red
        // if (mins < 1) {
        //     minutes.style.color = "red";
        //     seconds.style.color = "red";
        // }
        //if seconds becomes zero,
        //then page alert time up
        // if (mins < 0) {
        //     alert('time up');
        //     minutes.value = 0;
        //     seconds.value = 0;
        // }
        //if seconds > 0 then seconds is decremented
        if(secs>0) {
            secs--;
            setTimeout('Decrement()', 1000);
        }
    }
}
function getminutes() {
    //minutes is seconds divided by 60, rounded down
    mins = Math.floor(secs / 60);
    return mins;
}
function getseconds() {
    //take minutes remaining (as seconds) away
    //from total seconds remaining
    return secs - Math.round(mins * 60);
}



// The game test starts here
// All the constants are defined here so that they can use according to the way they need


const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestion => {
      const formattedQuestion = {
        question: loadedQuestion.question
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        // The loading of the questions starts here
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });

// The quiz game starts from here
    startGame();
  })
  .catch(err => {
    console.error(err);
  });

//CONSTANTS
const CORRECT_BONUS = 2;
const MAX_QUESTIONS = 10;


// During the start of the game ,the entire constants are defined
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

// The selection of the choices is done Headers,the user selects the choices depending upon his way of thinking.

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
// the score incrementation is done here
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};



// the highscore container

const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");


 