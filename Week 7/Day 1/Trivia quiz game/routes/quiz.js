const express = require('express');
const triviaQuestions = require('../models/triviaQuestions');

const router = express.Router();

function createQuiz() {
  return { currentQuestion: 0, score: 0, completed: false };
}

function formatQuestion(index) {
  return {
    questionNumber: index + 1,
    totalQuestions: triviaQuestions.length,
    question: triviaQuestions[index].question,
  };
}

router.get('/', (req, res) => {
  if (!req.session.quiz || req.session.quiz.completed) {
    req.session.quiz = createQuiz();
  }

  res.json(formatQuestion(req.session.quiz.currentQuestion));
});

router.post('/', (req, res) => {
  const quiz = req.session.quiz;
  if (!quiz) {
    return res.status(400).json({ error: 'Start the quiz with GET /quiz first.' });
  }
  if (quiz.completed) {
    return res.status(409).json({ error: 'The quiz is complete. Start a new quiz with GET /quiz.' });
  }

  const { answer } = req.body;
  if (typeof answer !== 'string' || !answer.trim()) {
    return res.status(400).json({ error: 'A non-empty answer is required.' });
  }

  const current = triviaQuestions[quiz.currentQuestion];
  const correct = answer.trim().toLowerCase() === current.answer.toLowerCase();
  if (correct) {
    quiz.score += 1;
  }
  quiz.currentQuestion += 1;

  const feedback = {
    correct,
    feedback: correct ? 'Correct!' : `Incorrect. The correct answer is ${current.answer}.`,
  };

  if (quiz.currentQuestion === triviaQuestions.length) {
    quiz.completed = true;
    return res.json({
      ...feedback,
      quizComplete: true,
      score: quiz.score,
      totalQuestions: triviaQuestions.length,
      scoreUrl: '/quiz/score',
    });
  }

  res.json({
    ...feedback,
    quizComplete: false,
    nextQuestion: formatQuestion(quiz.currentQuestion),
  });
});

router.get('/score', (req, res) => {
  const quiz = req.session.quiz;
  if (!quiz || !quiz.completed) {
    return res.status(409).json({ error: 'Complete the quiz before viewing your score.' });
  }

  res.json({
    score: quiz.score,
    totalQuestions: triviaQuestions.length,
    percentage: Math.round((quiz.score / triviaQuestions.length) * 100),
  });
});

module.exports = router;