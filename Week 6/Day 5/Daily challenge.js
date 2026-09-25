const express = require('express');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const emojis = [
	{ emoji: '😀', name: 'Smile' },
	{ emoji: '🐶', name: 'Dog' },
	{ emoji: '🌮', name: 'Taco' },
	{ emoji: '🚀', name: 'Rocket' },
	{ emoji: '🎸', name: 'Guitar' },
	{ emoji: '🍕', name: 'Pizza' },
	{ emoji: '🌈', name: 'Rainbow' },
	{ emoji: '🦄', name: 'Unicorn' },
	{ emoji: '🏀', name: 'Basketball' },
	{ emoji: '🐝', name: 'Bee' },
	{ emoji: '🌻', name: 'Sunflower' },
	{ emoji: '🎉', name: 'Party' },
];

const players = new Map();
const questions = new Map();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function shuffle(items) {
	return [...items].sort(() => Math.random() - 0.5);
}

function createQuestion() {
	const answer = emojis[Math.floor(Math.random() * emojis.length)];
	const distractors = shuffle(emojis.filter(({ name }) => name !== answer.name)).slice(0, 3);
	const question = {
		id: crypto.randomUUID(),
		answer: answer.name,
		emoji: answer.emoji,
		options: shuffle([answer.name, ...distractors.map(({ name }) => name)]),
	};

	questions.set(question.id, question);
	return question;
}

function publicQuestion(question) {
	return { id: question.id, emoji: question.emoji, options: question.options };
}

function getPlayer(playerId, name = 'Player') {
	if (!players.has(playerId)) {
		players.set(playerId, { name: name.trim().slice(0, 20) || 'Player', score: 0 });
	}

	const player = players.get(playerId);
	if (name.trim()) player.name = name.trim().slice(0, 20);
	return player;
}

app.get('/api/game', (request, response) => {
	response.json({ question: publicQuestion(createQuestion()) });
});

app.post('/api/guess', (request, response) => {
	const { playerId, questionId, guess, name } = request.body;
	const question = questions.get(questionId);

	if (!playerId || !questionId || typeof guess !== 'string' || !question) {
		return response.status(400).json({ error: 'A valid player, question, and guess are required.' });
	}

	const player = getPlayer(playerId, typeof name === 'string' ? name : 'Player');
	const correct = guess === question.answer;
	if (correct) player.score += 1;
	questions.delete(questionId);

	return response.json({
		correct,
		answer: question.answer,
		score: player.score,
		question: publicQuestion(createQuestion()),
	});
});

app.get('/api/leaderboard', (request, response) => {
	const leaderboard = [...players.values()]
		.sort((first, second) => second.score - first.score)
		.slice(0, 10);

	response.json({ leaderboard });
});

app.listen(PORT, () => {
	console.log('Emoji Guess is running at http://localhost:' + PORT);
});
