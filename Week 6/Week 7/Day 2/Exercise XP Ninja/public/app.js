const form = document.querySelector('#answer-form')
const fieldset = document.querySelector('#question-fieldset')
const questionText = document.querySelector('#question-text')
const optionsContainer = document.querySelector('#options')
const feedback = document.querySelector('#feedback')
const submitButton = document.querySelector('#submit-button')
const progressText = document.querySelector('#progress-text')
const progressCount = document.querySelector('#progress-count')
const progressBar = document.querySelector('#progress-bar')
const scoreDisplay = document.querySelector('#score')

const state = {
  questions: [],
  currentIndex: 0,
  score: 0,
  selectedOptionId: null,
  answered: false,
}

function updateProgress() {
  const total = state.questions.length
  const current = state.currentIndex + 1
  progressText.textContent = `QUESTION ${current} OF ${total}`
  progressCount.textContent = `${Math.round((state.currentIndex / total) * 100)}% COMPLETE`
  progressBar.style.width = `${(state.currentIndex / total) * 100}%`
}

function renderQuestion() {
  const question = state.questions[state.currentIndex]
  state.selectedOptionId = null
  state.answered = false
  feedback.textContent = ''
  feedback.className = 'feedback'
  questionText.textContent = question.question
  optionsContainer.replaceChildren()

  question.options.forEach((option, index) => {
    const button = document.createElement('button')
    button.className = 'option-button'
    button.type = 'button'
    button.setAttribute('role', 'radio')
    button.setAttribute('aria-checked', 'false')

    const marker = document.createElement('span')
    marker.className = 'option-marker'
    marker.setAttribute('aria-hidden', 'true')
    marker.textContent = String.fromCharCode(65 + index)

    const label = document.createElement('span')
    label.textContent = option.option
    button.append(marker, label)

    button.addEventListener('click', () => {
      if (state.answered) return
      state.selectedOptionId = option.id
      optionsContainer.querySelectorAll('.option-button').forEach((item) => {
        item.setAttribute('aria-checked', String(item === button))
      })
      submitButton.disabled = false
      submitButton.textContent = 'Lock in answer'
    })

    optionsContainer.append(button)
  })

  fieldset.disabled = false
  submitButton.disabled = true
  submitButton.textContent = 'Choose an answer'
  updateProgress()
}

function showResults() {
  fieldset.hidden = true
  progressText.textContent = 'QUIZ COMPLETE'
  progressCount.textContent = `${state.questions.length} QUESTIONS ANSWERED`
  progressBar.style.width = '100%'
  feedback.textContent = ''
  submitButton.remove()

  const result = document.createElement('div')
  result.className = 'result-view'

  const stamp = document.createElement('div')
  stamp.className = 'result-stamp'
  stamp.setAttribute('aria-hidden', 'true')
  stamp.textContent = state.score === state.questions.length ? '★' : '✓'

  const heading = document.createElement('h2')
  heading.textContent = state.score === state.questions.length ? 'Perfect run.' : 'That’s a wrap.'

  const summary = document.createElement('p')
  summary.textContent = `You got ${state.score} out of ${state.questions.length} correct.`

  const restart = document.createElement('button')
  restart.className = 'restart-button'
  restart.type = 'button'
  restart.textContent = 'Play again'
  restart.addEventListener('click', () => window.location.reload())

  result.append(stamp, heading, summary, restart)
  form.append(result)
}

function submitCurrentAnswer() {
  const question = state.questions[state.currentIndex]
  submitButton.disabled = true
  const correct = state.selectedOptionId === question.correctAnswer
  const correctAnswer = question.options.find((option) => option.id === question.correctAnswer)

  state.answered = true
  if (correct) {
    state.score += 1
    scoreDisplay.textContent = String(state.score)
    feedback.textContent = 'Correct. Nice work.'
    feedback.classList.add('correct')
  } else {
    feedback.textContent = `Not quite. The answer is: ${correctAnswer.option}`
    feedback.classList.add('incorrect')
  }

  optionsContainer.querySelectorAll('.option-button').forEach((button, index) => {
    const option = question.options[index]
    button.disabled = true
    if (option.id === state.selectedOptionId && correct) {
      button.classList.add('is-correct')
    } else if (option.id === state.selectedOptionId) {
      button.classList.add('is-incorrect')
    }
  })

  submitButton.disabled = false
  submitButton.textContent = state.currentIndex === state.questions.length - 1
    ? 'See your score'
    : 'Next question'
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  if (state.answered) {
    state.currentIndex += 1
    if (state.currentIndex === state.questions.length) {
      showResults()
    } else {
      renderQuestion()
    }
    return
  }

  if (state.selectedOptionId !== null) {
    await submitCurrentAnswer()
  }
})

function startQuiz() {
  state.questions = window.quizQuestions || []

  if (state.questions.length === 0) {
    questionText.textContent = 'There are no quiz questions yet.'
    progressText.textContent = 'QUIZ UNAVAILABLE'
    return
  }

  scoreDisplay.textContent = '0'
  renderQuestion()
}

startQuiz()