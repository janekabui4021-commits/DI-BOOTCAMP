// Exercise 1: Hello, World! Program
const greeting: string = "Hello, World!";
console.log(greeting);
//  Exercise 2: Type Annotations
let age: number = 25;
let name: string = "Alice";

console.log(`Name: ${name}, Age: ${age}`);

//  Exercise 3: Union Types

let id: string | number;

id = "101"; 
id = 202; 
//   Exercise 4: Control Flow with if...else
    function checkNumber(num: number): string {
  if (num > 0) {
    return "Positive";
  } else if (num < 0) {
    return "Negative";
  } else {
    return "Zero";
  }
}

console.log(checkNumber(10));  
console.log(checkNumber(-5));  
console.log(checkNumber(0));   

// Exercise 5: Tuple Types

function getDetails(name: string, age: number): [string, number, string] {
  const greeting = `Hello, ${name}! You are ${age} years old.`;
  return [name, age, greeting];
}

const details = getDetails("Alice", 25);
console.log(details); 

//  Exercise 6: Object Type Annotations

type Person = {
  name: string;
  age: number;
};

function createPerson(name: string, age: number): Person {
  return {
    name,
    age
  };
}

const person = createPerson("Alice", 25);
console.log(person); 

//Exercise 7: Type Assertions

// Cast the element retrieved from the DOM to an HTMLInputElement
if (typeof document !== "undefined") {
  const inputElement = document.getElementById("username") as HTMLInputElement | null;

  if (inputElement) {
    inputElement.value = "John Doe";
  }
}

//Exercise 8: switch Statement with Complex Conditions
function getAction(role: string): string {
  switch (role) {
    case "admin":
      return "Manage users and settings";
    case "editor":
      return "Edit content";
    case "viewer":
      return "View content";
    case "guest":
      return "Limited access";
    default:
      return "Invalid role";
  }
}

console.log(getAction("admin"));   
console.log(getAction("editor"));  
console.log(getAction("viewer"));  
console.log(getAction("guest"));   
console.log(getAction("unknown")); 

// Exercise 9: Function Overloading with Default Parameters

// Overload signatures
function greet(): string;
function greet(name: string): string;

// Implementation
function greet(name: string = "Guest"): string {
  return `Hello, ${name}!`;
}

console.log(greet());        
console.log(greet("Alice")); 