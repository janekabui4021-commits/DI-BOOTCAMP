const questionModel = require('../models/questionModel')

function getQuestions(req, res) {
  res.status(200).json(questionModel.getAllQuestions())
}

function submitAnswer(req, res) {
  const questionId = Number(req.body?.questionId)
  const optionId = Number(req.body?.optionId)

  if (!Number.isInteger(questionId) || !Number.isInteger(optionId)) {
    return res.status(400).json({ message: 'questionId and optionId are required' })
  }

  const result = questionModel.checkAnswer(questionId, optionId)
  if (result.status === 'question-not-found') {
    return res.status(404).json({ message: 'Question not found' })
  }
  if (result.status === 'invalid-option') {
    return res.status(400).json({ message: 'That option does not belong to this question' })
  }

  res.status(200).json({ correct: result.correct, correctAnswer: result.correctAnswer })
}

module.exports = { getQuestions, submitAnswer }