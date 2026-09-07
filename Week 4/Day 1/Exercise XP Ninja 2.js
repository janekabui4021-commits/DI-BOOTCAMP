// Exercise 1: Menu
const menu = [
	{
		type: "starter",
		name: "Houmous with Pita",
	},
	{
		type: "starter",
		name: "Vegetable Soup with Houmous peas",
	},
	{
		type: "dessert",
		name: "Chocolate Cake",
	},
];

const hasDessert = menu.some((course) => course.type === "dessert")
	? "The menu has a dessert."
	: "The menu has no dessert.";
const allStarters = menu.every((course) => course.type === "starter");

console.log(hasDessert);
console.log("Are all courses starters?", allStarters);

if (!menu.some((course) => course.type === "main course")) {
	menu.push({
		type: "main course",
		name: "Vegetable Pasta",
	});
}

const vegetarian = ["vegetable", "houmous", "eggs", "vanilla", "potatoes"];
menu.forEach((course) => {
	const courseName = course.name.toLowerCase();
	course.vegetarian = vegetarian.some((ingredient) =>
		courseName.includes(ingredient),
	);
});

console.log(menu);

// Exercise 2: Chop into chunks
function stringChop(string, chunkLength) {
	if (chunkLength <= 0) return [];

	const chunks = [];
	for (let index = 0; index < string.length; index += chunkLength) {
		chunks.push(string.slice(index, index + chunkLength));
	}
	return chunks;
}

console.log(stringChop("developers", 2));

// Exercise 3: Find a word and count its occurrences.
function searchWord(string, word) {
	const matches = string.match(new RegExp(word, "gi"));
	const count = matches ? matches.length : 0;
	return `'${word}' was found ${count} times.`;
}

console.log(searchWord("The quick brown fox", "fox"));

// Exercise 4: Reverse an array in place without creating a new array.
function reverseArray(array) {
	for (let left = 0, right = array.length - 1; left < right; left++, right--) {
		[array[left], array[right]] = [array[right], array[left]];
	}
	return array;
}

console.log(reverseArray([1, 2, 3, 4, 5]));
console.log(reverseArray([1, 2]));
console.log(reverseArray([]));
console.log(reverseArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
