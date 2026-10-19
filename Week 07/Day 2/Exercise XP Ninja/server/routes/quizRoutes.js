const express = require('express')
const quizController = require('../controllers/quizController')

const router = express.Router()

router.get('/questions', quizController.getQuestions)
router.post('/answers', quizController.submitAnswer)

module.exports = router