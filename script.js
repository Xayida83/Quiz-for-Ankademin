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
    question: "Select the characters who have been married during the series. (Choose 2 or 3)",
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
    question: "Select the seasons in which Monica and Chandler are a couple. (Choose 2 or 3)",
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
    question: "Select the characters who have worked at Central Perk. (Choose 2 or 3)",
    answers: [
      {text: "Ross Geller", correct: false},
      {text: "Pheobe Buffay", correct: false},
      {text: "Rachel Green", correct: true},
      {text: "Joey Tribbiani", correct: true}
    ]
  }
];

// Nej, svaret är False. Chandler Bing arbetar inte med statistik och analys vid en databedömningsfirma. Han har ett kontorsjobb inom datarobotteknik, och hans yrkesroll är ofta ett skämt inom serien.

const toggleModeBtn = document.querySelector("#toggleModeBtn");
const body = document.body;
//If the class does not exist add dark-mode.
toggleModeBtn.addEventListener("click", () => {
  body.classList.toggle('dark-mode'); 
});

let questionsContainer = document.querySelector(".questionsContainer");
let nextQuestionBtn = document.querySelector(".nextBtn");
let currentQuestionIndex = 0;
// let answerText = "";

//Count the questions and show one at a time
nextQuestionBtn.addEventListener("click", () => {
  questionsContainer.innerHTML = "";
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(currentQuestionIndex);
  } else {
    alert("End of quiz");
  }
});

//To show the questions and it´s answer options.
let displayQuestion = (index) => {
  let card = document.createElement("div");
  card.classList.add("questionCard");

  let questionText = document.createElement("h2");
  questionText.className = "question";
  questionText.innerText = `${questions[index].question}`;

  card.appendChild(questionText);

  questions[index].answers.forEach(answer => {
    let options = document.createElement("div");
    options.className = "answersOption";

    let option = document.createElement("input");
    option.type = "checkbox";
    option.value = answer.text;
    option.name = "answers";

    // Lägg till en "change" eventlistener för varje checkbox och spara svaret
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
displayQuestion(currentQuestionIndex);

// En funktion för att uppdatera klassen baserat på om svaret är rätt eller fel
function updateAnswerClass(questionIndex, selectedAnswer) {
  let currentQuestion = questions[questionIndex];
  let selectedAnswerObject = currentQuestion.answers.find(answer => answer.text === selectedAnswer);

  if (selectedAnswerObject && selectedAnswerObject.correct) {
    console.log("correct")
  } else {
    console.log("Incorrect")
  }
}