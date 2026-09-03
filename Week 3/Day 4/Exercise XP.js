// Exercise 1: Scope
// #1.1: funcOne displays 3. The local let variable starts at 5 and is reassigned to 3.
// #1.2: Replacing let with const throws a TypeError because const cannot be reassigned.

// #2.1: The calls display 0, then 5, then 5. funcTwo changes the global variable a.
// #2.2: Replacing let with const throws a TypeError in funcTwo because a cannot be reassigned.

// #3.1: funcFour sets window.a to "hello", so funcFive displays "hello" in a browser.

// #4.1: funcSix displays "test" because its local a shadows the global a.
// #4.2: Replacing the local let with const has the same result because it is not reassigned.

// #5.1: The if block displays 5, while the code outside the block displays 2.
// The inner let a is block-scoped and shadows the outer a only inside the if block.
// #5.2: Replacing either let with const has the same result because neither is reassigned.

// Exercise 2: Ternary operator
const winBattle = () => true;
const experiencePoints = winBattle() ? 10 : 1;
console.log("Experience points:", experiencePoints);

// Exercise 3: Is it a string?
const isString = value => typeof value === "string";
console.log(isString("hello"));
console.log(isString([1, 2, 4, 0]));

// Exercise 4: Find the sum
const sum = (firstNumber, secondNumber) => firstNumber + secondNumber;
console.log("Sum:", sum(4, 6));

// Exercise 5: Kg and grams
function kilogramsToGrams(weightInKilograms) {
	return weightInKilograms * 1000;
}
console.log("Declaration:", kilogramsToGrams(2));

const kilogramsToGramsExpression = function (weightInKilograms) {
	return weightInKilograms * 1000;
};
console.log("Expression:", kilogramsToGramsExpression(3));

// Function declarations are hoisted; function expressions are assigned to variables and are not callable before assignment.
const kilogramsToGramsArrow = weightInKilograms => weightInKilograms * 1000;
console.log("Arrow:", kilogramsToGramsArrow(4));

if (typeof document !== "undefined") {
	// Exercise 6: Fortune teller
	(function (numberOfChildren, partnerName, geographicLocation, jobTitle) {
		const fortune = `You will be a ${jobTitle} in ${geographicLocation}, and married to ${partnerName} with ${numberOfChildren} kids.`;
		const fortuneElement = document.querySelector("#fortune");
		if (fortuneElement) fortuneElement.textContent = fortune;
	})(2, "Samuel", "Paris", "web developer");

	// Exercise 7: Welcome
	(function (userName) {
		const userProfile = document.createElement("div");
		userProfile.className = "user-profile";
		userProfile.innerHTML = `<img src="https://i.pravatar.cc/96?img=12" alt="${userName}'s profile picture"><span>Welcome, ${userName}</span>`;
		const navbar = document.querySelector("#navbar");
		if (navbar) navbar.appendChild(userProfile);
	})("John");
}

// Exercise 8, Part I: nested functions
function makeJuicePartOne(size) {
	function addIngredients(firstIngredient, secondIngredient, thirdIngredient) {
		const juiceMessage = `The client wants a ${size} juice, containing ${firstIngredient}, ${secondIngredient}, ${thirdIngredient}.`;
		const juiceElement = document.querySelector("#juice-part-one");
		if (juiceElement) juiceElement.textContent = juiceMessage;
	}

	addIngredients("apple", "ginger", "mint");
}

if (typeof document !== "undefined") makeJuicePartOne("large");

// Exercise 8, Part II: makeJuice collects six ingredients before displaying them.
function makeJuice(size) {
	const ingredients = [];

	function addIngredients(firstIngredient, secondIngredient, thirdIngredient) {
		ingredients.push(firstIngredient, secondIngredient, thirdIngredient);
	}

	function displayJuice() {
		const juiceMessage = `The client wants a ${size} juice, containing ${ingredients.join(", ")}.`;
		const juiceElement = document.querySelector("#juice-part-two");
		if (juiceElement) juiceElement.textContent = juiceMessage;
	}

	addIngredients("pineapple", "banana", "coconut");
	addIngredients("lime", "spinach", "ginger");
	displayJuice();
}

if (typeof document !== "undefined") makeJuice("medium");
