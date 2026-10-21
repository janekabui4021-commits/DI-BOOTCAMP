
// Exercise 1: Union Types

function processValue(value: string | number): string {
  if (typeof value === 'number') {
    return `$${value.toFixed(2)}`;
  } else {
    return value.split('').reverse().join('');
  }
}

console.log(processValue(100));     
console.log(processValue("hello")); 



// Exercise 2: Array Type Annotations

function sumNumbersInArray(arr: (number | string)[]): number {
  let sum = 0;
  for (const item of arr) {
    if (typeof item === 'number') {
      sum += item;
    }
  }
  return sum;
}

console.log(sumNumbersInArray([10, "apple", 20, "banana", 30])); 
console.log(sumNumbersInArray(["a", "b", "c"]));               



// Exercise 3: Type Aliases

type AdvancedUser = {
  name: string;
  age: number;
  address?: string;
};

function introduceAdvancedUser(user: AdvancedUser): string {
  let greeting = `Hello, my name is ${user.name} and I am ${user.age} years old.`;
  if (user.address) {
    greeting += ` I live at ${user.address}.`;
  }
  return greeting;
}
const user1: AdvancedUser = { name: "Alice", age: 28 };
const user2: AdvancedUser = { name: "Bob", age: 34, address: "123 Main St" };

console.log(introduceAdvancedUser(user1)); 

console.log(introduceAdvancedUser(user2)); 


// Exercise 4: Optional Parameters


function welcomeUser(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}
console.log(welcomeUser("Sarah"));           
console.log(welcomeUser("David", "Welcome")); 