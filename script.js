let questions =[ 
  {
    question: "Does Ross Geller work as a chef?",
    answers: [
      {text: "No", correct: true},
      {text: "Yes", correct: false}
    ]
  },
  {
    question: "Who is Monica's brother?",
    answers: [
      {text: "Joey", correct: false},
      {text: "Chandler", correct: false},
      {text: "Ross", correct: true},
      {text: "Mike", correct: false}
    ]
  },
  {
    question: "Select the characters who have been married during the series. \n(Choose 2 or 3)",
    answers: [
      {text: "Ross Geller", correct: true},
      {text: "Monica Geller", correct: true},
      {text: "Rachel Green", correct: false},
      {text: "Chandler Bing", correct: true}
    ]
  },
  {
    question: "Is Phoebe's alter ego called Regina Phalange?",
    answers: [
      {text: "No", correct: false},
      {text: "Yes", correct: true}
    ]
  },
  {
    question: "What is Joey Tribbiani's catchphrase?",
    answers: [
      {text: "Oh my God!", correct: false},
      {text: "Pivot!", correct: false},
      {text: "How you doin'?", correct: true},
      {text: "We were on a break!", correct: false}
    ]
  },
  {
    question: "Select the seasons in which Monica and Chandler are a couple. \n(Choose 2 or 3)",
    answers: [
      {text: "Season 4", correct: true},
      {text: "Season 5", correct: true},
      {text: "Season 6", correct: true},
      {text: "Season 7", correct: false}
    ]
  },
  {
    question: "Does Chandler Bing work with statistics and analysis at a data assessment firm?",
    answers: [
      {text: "No", correct: true},
      {text: "Yes", correct: false}
    ]
  },
  {
    question: "What is the name of Ross and Monica's dog when they were kids?",
    answers: [
      {text: "Rex", correct: false},
      {text: "Rover", correct: false},
      {text: "Chi-Chi", correct: true},
      {text: "Fluffy", correct: false}
    ]
  },
  {
    question: "Does Ross Geller own an oversized Porsche costume?",
    answers: [
      {text: "No", correct: false},
      {text: "Yes", correct: true}
    ]
  },
  {
    question: "Select the characters who have worked at Central Perk. \n(Choose 2 or 3)",
    answers: [
      {text: "Ross Geller", correct: false},
      {text: "Pheobe Buffay", correct: false},
      {text: "Rachel Green", correct: true},
      {text: "Joey Tribbiani", correct: true}
    ]
  }
];

/** Svar på Chandler frågan
 *  Nej, svaret är False. Chandler Bing arbetar inte med statistik och analys vid en databedömningsfirma. Han har ett kontorsjobb inom datarobotteknik, och hans yrkesroll är ofta ett skämt inom serien.
 
*/

let userCorrectResponses = [];
let userWrongResponses = [];

let questionsContainer = document.querySelector(".questionsContainer");
let nextQuestionBtn = document.querySelector(".nextBtn");

let currentQuestionIndex = 0;

const toggleModeBtn = document.querySelector("#toggleModeBtn");
const body = document.body;
// const response = document.querySelectorAll(".response");
//If the class does not exist add dark-mode.
toggleModeBtn.addEventListener("click", () => {
  body.classList.toggle('dark-mode'); 
  // response.forEach(div => {
  //   div.style.boxShadow = "0px 0px 5px white";
  // });
});

//Count the questions and show one at a time
nextQuestionBtn.addEventListener("click", () => {
  questionsContainer.innerHTML = "";
  
  currentQuestionIndex++;
  
 //If and else to see when questions are over
  currentQuestionIndex < questions.length ? displayQuestion(currentQuestionIndex) : (showResult(), showTheAnswers(), nextQuestionBtn.classList.add("hide"));
});

//To show the questions and it´s answer options.
let displayQuestion = (index) => {
  
  let card = document.createElement("div");
  card.className="questionCard";

  let questionText = document.createElement("h2");
  questionText.className = "question";
  questionText.innerText = `${questions[index].question}`;

  card.append(questionText);

  questions[index].answers.forEach(answer => {
    let options = document.createElement("div");
    options.className = "answersOption";

    let option = document.createElement("input");
    option.type = "checkbox";
    option.value = answer.text;
    option.name = "answers";
    option.id = answer.text;

    // Add a "change" event listener for each checkbox and save the response
    option.addEventListener("change", () => {
        let checkedBox = card.querySelectorAll("input[type='checkbox']:checked");     
        checkedBox.forEach(checkbox => {
        let answerText = checkbox.value;
        updateAnswerClass(currentQuestionIndex, answerText);
      });
    });
  
    let label = document.createElement("label");
    label.innerText = answer.text;
    label.setAttribute('for', answer.text);

    options.appendChild(option);
    options.appendChild(label);
    card.appendChild(options);
  });

  questionsContainer.appendChild(card);
}
/** * TODO:lägg till en startknapp och sätt första frågan på rätt plats */
displayQuestion(currentQuestionIndex);

// Check question. If right - this happens. else - other things happens
let updateAnswerClass = (questionIndex, selectedAnswer) => {
  //Get current question from array 'questions'
  let currentQuestion = questions[questionIndex];
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
        } else {
          option.classList.add("wrong");
          console.log("Incorrect");
          userWrongResponses.push({ question: currentQuestion.question, selectedAnswer: selectedAnswer });
          disableCheckboxes();
        }
      } 
    });
  };
};

let maxScores = 19;

//A div to display the result
let showResult = () => {
  questionsContainer.innerHTML = "";
  let picture = document.querySelector(".friendsPic");
  picture.classList.add("hide");

  let percentageCorrect = Math.floor((userCorrectResponses.length / maxScores) * 100);

  // Determine the result text and color based on the percentage
  let resultText = "";
  let resultColor = "";

  if (percentageCorrect < 50) {
    resultText = "Failed";
    resultColor = "#f32828";
  } else if (percentageCorrect >= 50 && percentageCorrect <= 75) {
    resultText = "Good";
    resultColor = "#f1a00c";
  } else {
    resultText = "Well done!";
    resultColor = "#08a308";
  }

  //The div to display the results
  let resultDiv = document.createElement('div');
  resultDiv.className = "userResult";
  resultDiv.innerHTML = `<h2 style="color: ${resultColor};">Your Result</h2>
                        <p>Correct Answers: ${userCorrectResponses.length}</p>
                        <p>Incorrect Answers: ${userWrongResponses.length}</p>
                        <p style="color: ${resultColor};">Percentage Correct: ${percentageCorrect}% - ${resultText}</p>`;

  questionsContainer.append(resultDiv);
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

/** *TODO: When user hasnt answerd a question, get an alert */