// Exercise 1: map returns [2, 4, 6].
const mapResult = [1, 2, 3].map((num) => {
	if (typeof num === "number") return num * 2;
	return;
});

console.log(mapResult);

// Exercise 2: reduce starts with [1, 2] and concatenates each array.
const reduceResult = [[0, 1], [2, 3]].reduce(
	(acc, cur) => acc.concat(cur),
	[1, 2],
);

console.log(reduceResult);

// Exercise 3: i is the zero-based index: 0, 1, 2, 3, 4, and 5.
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
	console.log(num, i);
	return num * 2;
});

console.log(newArray);

// Exercise 4.1: Flatten two levels, leaving [4] and [5] nested once.
const array = [[1], [2], [3], [[[4]]], [[[5]]]];
const flattenedArray = array.flat(2);

console.log(flattenedArray); // [1, 2, 3, [4], [5]]

// Exercise 4.2: Join each nested group into a sentence.
const greeting = [
	["Hello", "young", "grasshopper!"],
	["you", "are"],
	["learning", "fast!"],
];
const greetingSentences = greeting.map((words) => words.join(" "));

console.log(greetingSentences);

// Exercise 4.3: Join the sentences into one string.
const greetingString = greetingSentences.join(" ");

console.log(greetingString);

// Exercise 4.4: Flatten every level around 3.
const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
const released = trapped.flat(Infinity);

console.log(released); // [3]
