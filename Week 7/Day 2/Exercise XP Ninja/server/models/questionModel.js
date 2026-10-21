const questions = require('../../public/quiz-data')

function getAllQuestions() {
  return questions.map(({ id, question, options }) => ({
    id,
    question,
    options,
  }))
}

function checkAnswer(questionId, optionId) {
  const question = questions.find((item) => item.id === questionId)
  if (!question) {
    return { status: 'question-not-found' }
  }

  const isOptionForQuestion = question.options.some((option) => option.id === optionId)
  if (!isOptionForQuestion) {
    return { status: 'invalid-option' }
  }

  const correctAnswer = question.options.find((option) => option.id === question.correctAnswer)
  return {
    status: 'answered',
    correct: optionId === question.correctAnswer,
    correctAnswer: correctAnswer.option,
  }
}

module.exports = { getAllQuestions, checkAnswer }