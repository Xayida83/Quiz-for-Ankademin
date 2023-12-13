const elephantQuiz = {
  name: "Elephant Quiz",
  image: "/Images/elephant.jpg",
  questions: [
    {
      question: "What is the pregnancy period of an elephant?",
      answers: [
        { text: "9 months", correct: false },
        { text: "18 months", correct: true },
        { text: "24 months", correct: false },
        { text: "12 months", correct: false },
      ],
    },
    {
      question: "Which species of elephant is the largest?",
      answers: [
        { text: "African Bush Elephant", correct: true },
        { text: "Asian Elephant", correct: false },
      ],
    },
    {
      question: "How many muscles are in an elephant's trunk?",
      answers: [
        { text: "100,000", correct: false },
        { text: "40,000", correct: true },
        { text: "75,000", correct: false },
        { text: "20,000", correct: false },
      ],
    },
    {
      question: "What is a group of elephants called?",
      answers: [
        { text: "Pack", correct: false },
        { text: "Herd", correct: true },
      ],
    },
    {
      question: "What is the average lifespan of an elephant in the wild?",
      answers: [
        { text: "30 years", correct: false },
        { text: "50 years", correct: true },
        { text: "70 years", correct: false },
        { text: "20 years", correct: false },
      ],
    },
    {
      question: "What is the primary diet of elephants?",
      answers: [
        { text: "Meat", correct: false },
        { text: "Grass", correct: false },
        { text: "Leaves and Branches", correct: false },
        { text: "Herbivores, mainly grass", correct: true },
      ],
    },
    {
      question: "How many tusks does an elephant typically have?",
      answers: [
        { text: "Two", correct: true },
        { text: "One", correct: false },
        { text: "Three", correct: false },
        { text: "None", correct: false },
      ],
    },
    {
      question: "What are the typical habitats for elephants? \n (Select 2 or 3)",
      answers: [
        { text: "Rainforests", correct: true },
        { text: "Grasslands", correct: true },
        { text: "Arctic Tundra", correct: false },
        { text: "Mountains", correct: true },
      ],
    },
    {
      question: "Which continent are elephants not native to?",
      answers: [
        { text: "Asia", correct: false },
        { text: "Africa", correct: false },
        { text: "North America", correct: true },
        { text: "Europe", correct: false },
      ],
    },
    {
      question: "What is the lifespan of an elephant? \n(Select 2 or 3)",
      answers: [
        { text: "30-40 years", correct: false },
        { text: "50-60 years", correct: true },
        { text: "70-80 years", correct: true },
        { text: "90-100 years", correct: false },
      ],
    },
  ],
};
export default elephantQuiz;