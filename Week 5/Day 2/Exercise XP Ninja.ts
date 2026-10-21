
// Exercise 1: Conditional Types

// 1. Define a Conditional Type
type MappedType<T> = T extends number
  ? number
  : T extends string
  ? number
  : never;

// 2. Implement the Function
function mapType<T extends number | string>(input: T): MappedType<T> {
  if (typeof input === "number") {
    return (input * input) as MappedType<T>;
  } else {
    return input.length as MappedType<T>;
  }
}

//  Test the Function
const numResult = mapType(5); 
const strResult = mapType("Hello TypeScript"); 

console.log("Exercise 1 Tests:");
console.log(`Square of 5: ${numResult}`);
console.log(`Length of 'Hello TypeScript': ${strResult}`);



// Exercise 2: Keyof and Lookup Types

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

//  Test the Function
const user = {
  id: 101,
  name: "Alice",
  isAdmin: true,
};

const userName = getProperty(user, "name"); 
const userId = getProperty(user, "id")

console.log("\nExercise 2 Tests:");
console.log(`User Name: ${userName}`);
console.log(`User ID: ${userId}`);


// Exercise 3: Using Interfaces with Numeric Properties


//  Define an Interface
interface HasNumericProperty {
  [key: string]: number;
}

// 2. Implement the Function
function multiplyProperty<T extends HasNumericProperty, K extends keyof T & string>(
  obj: T,
  key: K,
  factor: number
): number {
  const value = obj[key];

  if (value === undefined) {
    throw new Error(`Property "${key}" does not exist.`);
  }

  return value * factor;
}

//  Test the Function
const itemScores: HasNumericProperty = {
  speed: 50,
  power: 80,
  defense: 30,
};

const boostedPower = multiplyProperty(itemScores, "power", 1.5); 
const boostedSpeed = multiplyProperty(itemScores, "speed", 2);  

console.log("\nExercise 3 Tests:");
console.log(`Boosted Power: ${boostedPower}`);
console.log(`Boosted Speed: ${boostedSpeed}`);