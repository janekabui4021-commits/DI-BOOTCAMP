// Exercise 1: Nested functions

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
const addTo = x => y => x + y;
const addToTen = addTo(10);
console.log(addToTen(3));

// Exercise 3: Currying
const curriedSum = a => b => a + b;
console.log(curriedSum(30)(1));

// Exercise 4: Currying
const add5 = curriedSum(5);
console.log(add5(12));

// Exercise 5: Composing
const compose = (f, g) => a => f(g(a));
const add1 = num => num + 1;
const addFive = num => num + 5;
console.log(compose(add1, addFive)(10));
