//1
const giphyApiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

async function fetchRandomGif() {
	const url = `https://api.giphy.com/v1/gifs/search?q=funny&rating=g&limit=25&api_key=${giphyApiKey}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Giphy request failed: ${response.status}`);
		}

		const data = await response.json();
		const randomGif = data.data[Math.floor(Math.random() * data.data.length)];
		const image = document.createElement("img");

		image.src = randomGif.images.original.url;
		image.alt = randomGif.title || "Random GIF";
		document.body.appendChild(image);
	} catch (error) {
		console.error("Unable to fetch a GIF:", error.message);
	}
}

function resolveAfter2Seconds() {
	console.log("starting slow promise");
	return new Promise(resolve => {
		setTimeout(() => {
			resolve("slow");
			console.log("slow promise is done");
		}, 2000);
	});
}

function resolveAfter1Second() {
	console.log("starting fast promise");
	return new Promise(resolve => {
		setTimeout(() => {
			resolve("fast");
			console.log("fast promise is done");
		}, 1000);
	});
}

async function sequentialStart() {
	console.log("==SEQUENTIAL START==");
	const slow = await resolveAfter2Seconds();
	console.log(slow);
	const fast = await resolveAfter1Second();
	console.log(fast);
}

async function concurrentStart() {
	console.log("==CONCURRENT START with await==");
	const slow = resolveAfter2Seconds();
	const fast = resolveAfter1Second();
	console.log(await slow);
	console.log(await fast);
}

//Exercise 4 : Modify fetch with Async/Await
const urls = [
	"https://jsonplaceholder.typicode.com/users",
	"https://jsonplaceholder.typicode.com/invalid-endpoint",
	"https://jsonplaceholder.typicode.com/albums"
];

async function getData() {
	try {
		const [users, posts, albums] = await Promise.all(urls.map(async url => {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`Request failed: ${response.status}`);
			}

			return response.json();
		}));

		console.log("users", users);
		console.log("posts", posts);
		console.log("albums", albums);
	} catch (error) {
		console.log("ooooooops");
		console.error(error.message);
	}
}

fetchRandomGif();
sequentialStart();
setTimeout(concurrentStart, 4000);
getData();
