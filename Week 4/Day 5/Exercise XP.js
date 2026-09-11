const giphyApiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

async function exercise1() {
	const url = `https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=${giphyApiKey}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Giphy request failed: ${response.status} ${response.statusText}`);
		}

		const gifs = await response.json();
		console.log("Exercise 1:", gifs);
	} catch (error) {
		console.error("Exercise 1 error:", error.message);
	}
}

async function exercise2() {
	const url = `https://api.giphy.com/v1/gifs/search?q=sun&rating=g&limit=10&offset=2&api_key=${giphyApiKey}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Giphy request failed: ${response.status} ${response.statusText}`);
		}

		const gifs = await response.json();
		console.log("Exercise 2:", gifs);
	} catch (error) {
		console.error("Exercise 2 error:", error.message);
	}
}

async function exercise3() {
	try {
		const response = await fetch("https://www.swapi.tech/api/starships/9/");

		if (!response.ok) {
			throw new Error(`Star Wars request failed: ${response.status} ${response.statusText}`);
		}

		const objectStarWars = await response.json();
		console.log("Exercise 3:", objectStarWars.result);
	} catch (error) {
		console.error("Exercise 3 error:", error.message);
	}
}

function resolveAfter2Seconds() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve("resolved");
		}, 2000);
	});
}

async function exercise4() {
	console.log("calling");
	const result = await resolveAfter2Seconds();
	console.log(result);
}

async function runExercises() {
	await exercise1();
	await exercise2();
	await exercise3();
	await exercise4();
}

runExercises();
