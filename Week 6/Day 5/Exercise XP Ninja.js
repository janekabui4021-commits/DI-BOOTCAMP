const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.QUIZ_PORT || 3001;

const questions = [
	{
		question: 'Which language runs directly in a web browser?',
		answers: ['Python', 'JavaScript', 'C#', 'Java'],
		correctAnswer: 'JavaScript',
	},
	{
		question: 'Which HTTP method is commonly used to submit new data?',
		answers: ['GET', 'POST', 'DELETE', 'HEAD'],
		correctAnswer: 'POST',
	},
	{
		question: 'Which Node.js module is used to create an Express server?',
		answers: ['express', 'react', 'lodash', 'chalk'],
		correctAnswer: 'express',
	},
	{
		question: 'What does API stand for?',
		answers: ['Application Programming Interface', 'Advanced Program Input', 'Applied Process Index', 'Application Page Instruction'],
		correctAnswer: 'Application Programming Interface',
	},
	{
		question: 'Which command starts a Node.js file?',
		answers: ['run app.js', 'node app.js', 'start node app.js', 'open app.js'],
		correctAnswer: 'node app.js',
	},
];

app.use(express.json());

app.get('/api/quiz', (request, response) => {
	response.json({ questions: questions.map(({ question, answers }) => ({ question, answers })) });
});

app.post('/api/quiz/answer', (request, response) => {
	const { questionIndex, answer } = request.body;
	const question = questions[questionIndex];

	if (!question || typeof answer !== 'string') {
		return response.status(400).json({ error: 'A valid question and answer are required.' });
	}

	return response.json({
		correct: answer === question.correctAnswer,
		correctAnswer: question.correctAnswer,
	});
});

app.get('/', (request, response) => {
	response.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});

app.listen(PORT, () => {
	console.log('Quiz game is running at http://localhost:' + PORT);
});
