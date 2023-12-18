import { default as currentQuiz} from './questionsModule.js';
// * Second quiz
 //import { default as currentQuiz} from './elephantQuizModule.js';

 // TODO Write rules for the quiz  
 // TODO Be able to choose what quiz to play

let maxScores = 22;
let userCorrectResponses = [];
let userWrongResponses = [];
let userScore = 0;
let correctAnswerPoints = 1;
let incorrectAnswerPoints = -1;

let header = document.querySelector(".header");
let picture = document.querySelector(".quizImage");
let questionsContainer = document.querySelector(".questionsContainer");
let nextQuestionBtn = document.querySelector(".nextBtn");
const restartBtn = document.querySelector(".restartBtn");
let currentQuestionIndex = 0;

const toggleModeBtn = document.querySelector("#toggleModeBtn");
const body = document.body;

const getCheckedCheckboxes = (container) => {
  return container.querySelectorAll("input[type='checkbox']:checked");
};

header.innerText = currentQuiz.name;
if (currentQuiz.image){
  let image = document.createElement('img');
  image.src = currentQuiz.image;
  image.alt = "Picture of the subject of the quiz";
  picture.append(image);
}

// TODO Set max scores - might be diffrent in every quiz
// * The user gets extra points for each correct answer in a multiple choice question. Correct true is 15 but the maximum score is 22
// * Set score on the question instead or count the point at next question button. 
// currentQuiz.questions.forEach((question) => {
//   question.answers.forEach((answer) => {
//     if (answer.correct) {
//       maxScores += 1;
//     }
//   });
// });
console.log(maxScores);

// *If the class does not exist add dark-mode.
toggleModeBtn.addEventListener("click", () => {
  body.classList.toggle('dark-mode');
});
// * Start the quiz
let startButton = document.querySelector(".start");
startButton.addEventListener("click", () => {
  startButton.remove();
  nextQuestionBtn.classList.remove("hide");
  displayQuestion(currentQuestionIndex);
});

// * Count the questions and show one at a time
nextQuestionBtn.addEventListener("click", () => {
  let checkedBoxes = getCheckedCheckboxes(questionsContainer);
  
  if (checkedBoxes.length === 0) {
    // *If no boxes are checked, display an alert 
    alert("You must answer the question before proceeding.");
    return;
  }

  questionsContainer.innerHTML = "";
  
  currentQuestionIndex++;
  
 // * If and else to see when questions are over
  currentQuestionIndex < currentQuiz.questions.length ? displayQuestion(currentQuestionIndex) : (showResult(), showTheAnswers(), nextQuestionBtn.classList.add("hide"));
});

// * To show the questions and it´s answer options.
let displayQuestion = (index) => {  
  let card = document.createElement("div");
  card.className="questionCard";

  let questionText = document.createElement("h2");
  questionText.className = "question";
  questionText.innerText = `${currentQuiz.questions[index].question}`;

  card.append(questionText);

  currentQuiz.questions[index].answers.forEach(answer => {
    let options = document.createElement("div");
    options.className = "answersOption";

    let option = document.createElement("input");
    option.type = "checkbox";
    option.value = answer.text;
    option.name = "answers";
    option.id = answer.text;

    // * Add a "change" event listener for each checkbox and save the response
    option.addEventListener("change", () => {
      if(option.checked) {
        option.disabled = true;
      }

      let checkBox = getCheckedCheckboxes(card);    
        checkBox.forEach(checkbox => {
        let answerText = checkbox.value;
        updateAnswerClass(currentQuestionIndex, answerText);
      });
    });
  
    let label = document.createElement("label");
    label.innerText = answer.text;
    label.setAttribute('for', answer.text);

    options.append(option);
    options.append(label);
    card.append(options);
  });

  questionsContainer.append(card);
}
// TODO Correct answer gives points several times in a multiple answer question
// * Check question. If right - this happens. else - other things happens
let updateAnswerClass = (questionIndex, selectedAnswer) => {
  //Get current question from array 'questions'
  let currentQuestion = currentQuiz.questions[questionIndex];
  //Use the find method to search for the selected answer in the current question's answer options
  let selectedAnswerObject = currentQuestion.answers.find(answer => answer.text === selectedAnswer);

  if (selectedAnswerObject) {
    let optionsElements = document.querySelectorAll('.answersOption');
    
    optionsElements.forEach(option => {
      if (option.querySelector('label').innerText === selectedAnswer) {
        if (selectedAnswerObject.correct) {
          option.classList.add("correct");
          console.log("Correct");
          userCorrectResponses.push({ question: currentQuestion.question, selectedAnswer: selectedAnswer });
          userScore += correctAnswerPoints;
        } else {
          option.classList.add("wrong");
          console.log("Incorrect");
          userWrongResponses.push({ question: currentQuestion.question, selectedAnswer: selectedAnswer });
          userScore += incorrectAnswerPoints;
          disableCheckboxes();
        }
      } 
    });
  };
};

//  * A div to display the result
let showResult = () => {
  questionsContainer.innerHTML = "";
  
  picture.classList.add("hide");

  let percentageCorrect = Math.floor((userScore / maxScores) * 100);

  // Determine the result text and color based on the percentage
  let resultText = "";
  let resultColor = "";

  if (percentageCorrect < 50) {
    resultText = "Failed";
    resultColor = "rgb(209 87 87)";
  } else if (percentageCorrect >= 50 && percentageCorrect <= 75) {
    resultText = "Good";
    resultColor = "#f1a00c";
  } else {
    resultText = "Well done!";
    resultColor = "rgb(104 167 104)";
  }

  //The div to display the results
  let resultDiv = document.createElement('div');
  resultDiv.className = "userResult";
  resultDiv.innerHTML = `<h2 style="color: ${resultColor};">Your Result</h2>
                        <p>Correct Answers: ${userCorrectResponses.length}</p>
                        <p>Incorrect Answers: ${userWrongResponses.length}</p>
                        <p style="color: ${resultColor};">Percentage Correct: ${percentageCorrect}%</p>
                        <p style="color: ${resultColor};"> - ${resultText}</p>
                        <p>Score: ${userScore}</p>`;

  questionsContainer.append(resultDiv);
  restartBtn.classList.remove("hide");
};

let showTheAnswers = () => {
  let correctAnswersDiv = document.createElement('div');
  correctAnswersDiv.innerHTML = `<h2>Your correct answers</h2>`;

  userCorrectResponses.forEach((response) => {
    let userAnswerDiv = document.createElement('div');
    userAnswerDiv.className = "response";
    userAnswerDiv.innerHTML = `<p>Q: ${response.question}</p>
                              <p>A: ${response.selectedAnswer}</p>`;
    correctAnswersDiv.append(userAnswerDiv);
  });
  let wrongAnswersDiv = document.createElement('div');
  wrongAnswersDiv.innerHTML = `<h2>Your wrong answers</h2>`;

  userWrongResponses.forEach((response) => {
    let userAnswerDiv = document.createElement('div');
    userAnswerDiv.className = "response";

    userAnswerDiv.innerHTML = `<p>Q: ${response.question}</p>
                              <p>A: ${response.selectedAnswer}</p>`;
    wrongAnswersDiv.append(userAnswerDiv);
  });

  questionsContainer.append(correctAnswersDiv);
  questionsContainer.append(wrongAnswersDiv);
}

let disableCheckboxes = () => {
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach(checkbox => {
    checkbox.disabled = true;
  });
}

restartBtn.addEventListener("click", () => {
  // * Reset variables and UI state
  currentQuestionIndex = 0;
  userCorrectResponses = [];
  userWrongResponses = [];
  questionsContainer.innerHTML = "";
  nextQuestionBtn.classList.remove("hide");
  restartBtn.classList.add("hide");
  picture.classList.remove("hide");
  userScore = 0;

  // * Start the quiz again
  displayQuestion(currentQuestionIndex);
});
