const express = require('express');

const router = express.Router();
const triviaQuestions = [
  { question: 'What is the capital of France?', answer: 'Paris' },
  { question: 'Which planet is known as the Red Planet?', answer: 'Mars' },
  { question: 'What is the largest mammal in the world?', answer: 'Blue whale' }
];

function renderPage(content) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Trivia Quiz</title>
  <style>
    :root { font-family: "Trebuchet MS", sans-serif; color: #203b38; }
    * { box-sizing: border-box; }
    body { min-height: 100vh; margin: 0; display: grid; place-items: center; padding: 24px; background: linear-gradient(135deg, #e2f1e9, #f6e8cf 60%, #f0d2bc); }
    main { width: min(100%, 540px); padding: 36px; border: 1px solid #ffffffb8; border-radius: 16px; background: #fffdf8; box-shadow: 0 20px 60px #24443c20; }
    .eyebrow { margin: 0 0 10px; color: #347466; font-size: 13px; font-weight: 700; text-transform: uppercase; }
    h1 { margin: 0 0 18px; font-size: 30px; }
    .question { font-size: 21px; line-height: 1.45; }
    .feedback { padding: 12px 14px; border-radius: 8px; background: #e9f4ed; }
    .feedback.incorrect { background: #fff0e8; }
    label { display: block; margin: 22px 0 8px; font-weight: 700; }
    input { width: 100%; min-height: 48px; padding: 10px 12px; border: 1px solid #b8c9c0; border-radius: 8px; font: inherit; }
    button, a.button { display: inline-block; margin-top: 22px; padding: 12px 18px; border: 0; border-radius: 8px; background: #176b5c; color: white; font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; }
    button:hover, a.button:hover { background: #105548; }
    .score { margin: 24px 0; font-size: 42px; font-weight: 700; }
    @media (max-width: 480px) { main { padding: 26px 22px; } }
  </style>
</head>
<body><main>${content}</main></body>
</html>`;
}

router.get('/', (req, res) => {
  if (!req.session.quiz || req.session.quiz.currentIndex >= triviaQuestions.length) {
    req.session.quiz = { currentIndex: 0, score: 0, feedback: null };
  }
  const quiz = req.session.quiz;

  const question = triviaQuestions[quiz.currentIndex];
  const feedback = quiz.feedback
    ? `<p class="feedback ${quiz.feedback.correct ? '' : 'incorrect'}">${quiz.feedback.message}</p>`
    : '';

  res.type('html').send(renderPage(`<p class="eyebrow">Question ${quiz.currentIndex + 1} of ${triviaQuestions.length}</p>
    <h1>Trivia Quiz</h1>
    ${feedback}
    <p class="question">${question.question}</p>
    <form action="/quiz" method="post">
      <label for="answer">Your answer</label>
      <input id="answer" name="answer" type="text" autocomplete="off" required autofocus>
      <button type="submit">Submit answer</button>
    </form>`));
});

router.post('/', (req, res) => {
  const quiz = req.session.quiz;
  if (!quiz) {
    return res.redirect('/quiz');
  }
  if (quiz.currentIndex >= triviaQuestions.length) {
    return res.redirect('/quiz/score');
  }

  const answer = typeof req.body.answer === 'string' ? req.body.answer.trim() : '';
  if (!answer) {
    quiz.feedback = { correct: false, message: 'Please enter an answer before continuing.' };
    return res.redirect('/quiz');
  }

  const correctAnswer = triviaQuestions[quiz.currentIndex].answer;
  const correct = answer.toLocaleLowerCase() === correctAnswer.toLocaleLowerCase();
  if (correct) {
    quiz.score += 1;
  }
  quiz.feedback = {
    correct,
    message: correct ? 'Correct! Great job.' : `Not quite. The correct answer is ${correctAnswer}.`
  };
  quiz.currentIndex += 1;

  res.redirect(quiz.currentIndex === triviaQuestions.length ? '/quiz/score' : '/quiz');
});

router.get('/score', (req, res) => {
  const quiz = req.session.quiz;
  if (!quiz) {
    return res.redirect('/quiz');
  }
  if (quiz.currentIndex < triviaQuestions.length) {
    return res.redirect('/quiz');
  }

  const feedback = quiz.feedback
    ? `<p class="feedback ${quiz.feedback.correct ? '' : 'incorrect'}">${quiz.feedback.message}</p>`
    : '';

  res.type('html').send(renderPage(`<p class="eyebrow">Quiz complete</p>
    <h1>Your final score</h1>
    <p class="score">${quiz.score} / ${triviaQuestions.length}</p>
    ${feedback}
    <form action="/quiz" method="get"><button type="submit">Play again</button></form>`));
});

module.exports = router;