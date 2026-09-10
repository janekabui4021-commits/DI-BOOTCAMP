// 1st daily challenge
function makeAllCaps(words) {
	return new Promise((resolve, reject) => {
		if (!words.every(word => typeof word === 'string')) {
			reject('All words must be strings.');
			return;
		}

		resolve(words.map(word => word.toUpperCase()));
	});
}

function sortWords(words) {
	return new Promise((resolve, reject) => {
		if (words.length <= 4) {
			reject('The array must contain more than four words.');
			return;
		}

		resolve([...words].sort());
	});
}

makeAllCaps([1, 'pear', 'banana'])
	.then(arr => sortWords(arr))
	.then(result => console.log(result))
	.catch(error => console.log(error));

makeAllCaps(['apple', 'pear', 'banana'])
	.then(arr => sortWords(arr))
	.then(result => console.log(result))
	.catch(error => console.log(error));

makeAllCaps(['apple', 'pear', 'banana', 'melon', 'kiwi'])
	.then(arr => sortWords(arr))
	.then(result => console.log(result))
	.catch(error => console.log(error));

// 2nd daily challenge
const morse = `{
	"0": "-----",
	"1": ".----",
	"2": "..---",
	"3": "...--",
	"4": "....-",
	"5": ".....",
	"6": "-....",
	"7": "--...",
	"8": "---..",
	"9": "----.",
	"a": ".-",
	"b": "-...",
	"c": "-.-.",
	"d": "-..",
	"e": ".",
	"f": "..-.",
	"g": "--.",
	"h": "....",
	"i": "..",
	"j": ".---",
	"k": "-.-",
	"l": ".-..",
	"m": "--",
	"n": "-.",
	"o": "---",
	"p": ".--.",
	"q": "--.-",
	"r": ".-.",
	"s": "...",
	"t": "-",
	"u": "..-",
	"v": "...-",
	"w": ".--",
	"x": "-..-",
	"y": "-.--",
	"z": "--..",
	".": ".-.-.-",
	",": "--..--",
	"?": "..--..",
	"!": "-.-.--",
	"-": "-....-",
	"/": "-..-.",
	"@": ".--.-.",
	"(": "-.--.",
	")": "-.--.-"
}`;

function toJs() {
	return new Promise((resolve, reject) => {
		const morseJS = JSON.parse(morse);

		if (Object.keys(morseJS).length === 0) {
			reject('The Morse object is empty.');
			return;
		}

		resolve(morseJS);
	});
}

function toMorse(morseJS) {
	return new Promise((resolve, reject) => {
		const input = prompt('Enter a word or sentence:');

		if (input === null) {
			reject('No word or sentence was entered.');
			return;
		}

		const userInput = input.toLowerCase();
		const translation = [];

		for (const character of userInput) {
			if (!(character in morseJS)) {
				reject(`The character "${character}" is not in the Morse object.`);
				return;
			}

			translation.push(morseJS[character]);
		}

		resolve(translation);
	});
}

function joinWords(morseTranslation) {
	const output = morseTranslation.join('\n');
	const result = document.createElement('pre');
	result.textContent = output;
	document.body.appendChild(result);
	return output;
}

if (typeof prompt === 'function' && typeof document !== 'undefined') {
	toJs()
		.then(morseJS => toMorse(morseJS))
		.then(morseTranslation => joinWords(morseTranslation))
		.catch(error => console.log(error));
}
