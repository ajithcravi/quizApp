// Switching -code
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
var mins = 10;
var secs = mins * 60;
function countdown() {
    setTimeout('Decrement()', 60);
}
function Decrement() {
    if (document.getElementById) {
        minutes = document.getElementById("minutes");
        seconds = document.getElementById("seconds");
        if (seconds < 59) {
            seconds.value = secs;
        }
        else {
            minutes.value = getminutes();
            seconds.value = getseconds();
        }
        if(secs>0) {
            secs--;
            setTimeout('Decrement()', 1000);
        }
    }
}
function getminutes() {
    mins = Math.floor(secs / 60);
    return mins;
}
function getseconds() {
    return secs - Math.round(mins * 60);
}

// Questions
(function() {
  const myQuestions = [
    {
      question: "Synonym of 'Fostering'",
      answers: {
        a: "Safegaurding",
        b: "Neglecting",
        c: "Nurturing"
      },
      correctAnswer: "c"
    },
    {
      question: "Synonym of 'Massive'",
      answers: {
        a: "Gaping",
        b: "Lump",
        c: "Huge"
      },
      correctAnswer: "c"
    },
    {
      question: "Synonym of Defer",
      answers: {
        a: "Differ",
        b: "Indifferent",
        c: "Postpone"
      },
      correctAnswer: "a"
    }
  ];

  function buildQuiz() {
    const output = [];
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];
      for (letter in currentQuestion.answers) {
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");
    let numCorrect = 0;
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        answerContainers[questionNumber].style.color = "red";
      }
    });
    resultsContainer.innerHTML = `${numCorrect} marks out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }


  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();