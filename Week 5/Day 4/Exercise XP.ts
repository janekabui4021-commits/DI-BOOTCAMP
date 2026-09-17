//  Exercise 1: Intersection Types
type Person = {
  name: string;
  age: number;
};

type Address = {
  street: string;
  city: string;
};

type PersonWithAddress = Person & Address;

const personWithAddress: PersonWithAddress = {
  name: "Alice",
  age: 30,
  street: "123 Main St",
  city: "Metropolis"
};
//  Exercise 2: Type Guards with Union Types
function describeValue(value: number | string): string {
  if (typeof value === "number") {
    return "This is a number";
  } else {
    return "This is a string";
  }
}
// Exercise 3: Type Casting
let someValue: any = "Hello, TypeScript!";
let strLength: number = (someValue as string).length;

console.log(strLength);

// Exercise 4: Type Assertions with Union Types
function getFirstElement(arr: (number | string)[]): string {
  return arr[0] as string;
}

console.log(getFirstElement(["hello", 42, "world"]));
console.log(getFirstElement([100, "test"]));

// Exercise 5: Generic Constraints

function logLength<T extends { length: number }>(item: T): void {
  console.log(item.length);
}

logLength("Hello World");
logLength([1, 2, 3, 4]);

// Exercise 6: Intersection Types and Type Guards
type PersonType = {
  name: string;
  age: number;
};

type JobType = {
  position: string;
  department: string;
};

type Employee = PersonType & JobType;

function describeEmployee(employee: Employee): string {
  if (employee.position.toLowerCase() === "manager") {
    return `${employee.name} manages the ${employee.department} department.`;
  } else if (employee.position.toLowerCase() === "developer") {
    return `${employee.name} builds software in the ${employee.department} department.`;
  }
  return `${employee.name} works as a ${employee.position} in ${employee.department}.`;
}

// Exercise 7: Type Assertions and Generic Constraints
function formatInput<T extends { toString(): string }>(input: T): string {
  const str = input.toString() as string;
  return `Formatted: ${str.toUpperCase()}`;
}

console.log(formatInput(12345));
console.log(formatInput("typescript"));