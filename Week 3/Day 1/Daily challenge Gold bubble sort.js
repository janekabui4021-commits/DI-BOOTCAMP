// Daily challenge: Bubble sort in descending order

const numbers = [5, 0, 9, 1, 7, 4, 2, 6, 3, 8];

// 1. Convert array to string using toString()
console.log(numbers.toString());

// 2. Convert array to string using join()
console.log(numbers.join("+"));
console.log(numbers.join(" "));
console.log(numbers.join(""));

// Bonus: Bubble sort using nested loops (descending order)
let sortedNumbers = [...numbers];

for (let i = 0; i < sortedNumbers.length; i++) {
  for (let j = 0; j < sortedNumbers.length - 1 - i; j++) {
    if (sortedNumbers[j] < sortedNumbers[j + 1]) {
      let temp = sortedNumbers[j];
      sortedNumbers[j] = sortedNumbers[j + 1];
      sortedNumbers[j + 1] = temp;
    }
    console.log(`Step ${i + 1}, comparison ${j + 1}: ${sortedNumbers}`);
  }
}

console.log("Final sorted array:", sortedNumbers);
