var questions = [{
    question: "Which of the following functions combines text of two strings to return a new string?",
    answers: [
        {text: "concat", correct: true},
        {text: "add", correct: false},
        {text: "merge", correct: false},
        {text: "join", correct: false},
        {text: "annex", correct: false},
    ]
},
{
    question: "Which tag creates a numbered(ordered) list?",
    answers: [
        {text: "pl", correct: true},
        {text: "ul", correct: false},
        {text: "il", correct: false},
        {text: "ol", correct: true},
        {text: "gl", correct: false},
    ]
},
{
    question: "Is javascript case sensitive?",
    answers: [
        {text: "no", correct: false},
        {text: "maybe", correct: false},
        {text: "yes", correct: true},
        {text: "I don't know", correct: false},
        {text: "This quiz is hard", correct: false},
    ]
},
{
    question: "What are the correct values of a boolean?",
    answers: [
        {text: "true/false", correct: true},
        {text: "yes/no", correct: false},
        {text: "integer", correct: false},
        {text: "string", correct: false},
        {text: "float", correct: false},
    ]
}]

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
