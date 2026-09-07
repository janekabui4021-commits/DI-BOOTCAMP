// 1
const numbers = [10, 20, 30, 40];

// Using reduce
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); 
//2 Remove Duplicates
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];

// Using Set
const uniqueArray = [...new Set(arrayWithDuplicates)];
console.log(uniqueArray); 

//3 Remove certain values
function filterFalsyValues(arr) {
  return arr.filter(Boolean);
}

const sampleArray = [NaN, 0, 15, false, -22, '', undefined, 47, null];
console.log(filterFalsyValues(sampleArray)); 

//4 Repeat Please!

function repeat(str, n = 1) {
  return str.repeat(n);
}

console.log(repeat('Ha!', 3)); 
console.log(repeat('Ha!'));    

//5 Turtle and Rabbit
const startLine = '     ||<- Start line';
let turtle = '🐢';
let rabbit = '🐇';

// Pad start to match the index of the start line bar
turtle = turtle.padStart(8);
rabbit = rabbit.padStart(8);

console.log(startLine);
console.log(turtle);
console.log(rabbit);