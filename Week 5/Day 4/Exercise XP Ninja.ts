//Exercise 1: Combining Intersection Types with Type Guards
// 1. Define Interfaces
interface User {
  name: string;
  email: string;
}

interface Admin {
  adminLevel: number;
}

// 2. Combine Interfaces using Intersection Type
type AdminUser = User & Admin;

// 3. Type Guard and Property Retrieval Function
function getProperty(obj: AdminUser, prop: string): any {
  if (prop in obj) {
    return obj[prop as keyof AdminUser];
  }
  return undefined;
}

// Test Exercise 1
const adminUser: AdminUser = {
  name: "Alice",
  email: "alice@example.com",
  adminLevel: 1,
};

console.log(getProperty(adminUser, "name")); 
console.log(getProperty(adminUser, "adminLevel")); 
console.log(getProperty(adminUser, "age"));


//Exercise 2: Type Casting with Generics
function castToType<T>(value: any, constructor: new (val: any) => T): T {
  return new constructor(value);
}

const numVal = castToType<Number>("123", Number);
const boolVal = castToType<Boolean>("true", Boolean);

console.log(numVal, typeof numVal); 
console.log(boolVal, typeof boolVal); 

//Exercise 3: Type Assertions with Generic Constraints

function getArrayLength<T extends number[] | string[]>(arr: T): number {
  return (arr as Array<number | string>).length;
}


const numberArray = [10, 20, 30, 40];
const stringArray = ["apple", "banana", "cherry"];

console.log(getArrayLength(numberArray)); 
console.log(getArrayLength(stringArray)); 

//Exercise 4: Generic Interfaces with Class Implementation

interface Storage<T> {
  add(item: T): void;
  get(index: number): T | undefined;
}
class Box<T> implements Storage<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }
}

const numberBox = new Box<number>();
numberBox.add(100);
numberBox.add(200);
console.log(numberBox.get(0)); 
console.log(numberBox.get(1)); 

const stringBox = new Box<string>();
stringBox.add("Hello");
stringBox.add("TypeScript");
console.log(stringBox.get(0)); 

//Exercise 5: Combining Generic Classes with Constraints

interface Item<T> {
  value: T;
}

class Queue<T> {
  private elements: Item<T>[] = [];

  add(item: Item<T>): void {
    this.elements.push(item);
  }

  remove(): Item<T> | undefined {
    return this.elements.shift();
  }
}
const numberQueue = new Queue<number>();
numberQueue.add({ value: 42 });
numberQueue.add({ value: 99 });
console.log(numberQueue.remove()); 

const stringQueue = new Queue<string>();
stringQueue.add({ value: "TypeScript" });
console.log(stringQueue.remove()); 
