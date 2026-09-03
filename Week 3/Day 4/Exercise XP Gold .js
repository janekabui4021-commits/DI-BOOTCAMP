// Exercise 1: Nested functions
// Prediction: landscape() returns "____/''''\\____".
// flat(4) adds four underscores, mountain(4) adds /, four apostrophes, and \\,
// and the final flat(4) adds four more underscores. The inner functions share
// and update the result variable from the outer landscape function.

const landscape = () => {
	let result = "";

	const flat = x => {
		for (let count = 0; count < x; count += 1) {
			result += "_";
		}
	};

	const mountain = x => {
		result += "/";
		for (let counter = 0; counter < x; counter += 1) {
			result += "'";
		}
		result += "\\";
	};

	flat(4);
	mountain(4);
	flat(4);

	return result;
};

console.log(landscape());

// Exercise 2: Closure
// Prediction: addTo(10) returns a function that remembers x as 10.
// Therefore, addToTen(3) returns 13.
const addTo = x => y => x + y;
const addToTen = addTo(10);
console.log(addToTen(3));

// Exercise 3: Currying
// Prediction: curriedSum(30) returns a function waiting for b.
// Calling that function with 1 returns 31.
const curriedSum = a => b => a + b;
console.log(curriedSum(30)(1));

// Exercise 4: Currying
// Prediction: curriedSum(5) creates a function that adds 5 to its argument.
// Therefore, add5(12) returns 17.
const add5 = curriedSum(5);
console.log(add5(12));

// Exercise 5: Composing
// Prediction: compose(add1, add5)(10) first applies add5 and then add1:
// 10 + 5 = 15, followed by 15 + 1 = 16.
const compose = (f, g) => a => f(g(a));
const add1 = num => num + 1;
const addFive = num => num + 5;
console.log(compose(add1, addFive)(10));
