//Exercise 1: Class with Access Modifiers
class Employee {
  private name: string;
  private salary: number;
  public position: string;
  protected department: string;

  constructor(name: string, salary: number, position: string, department: string) {
    this.name = name;
    this.salary = salary;
    this.position = position;
    this.department = department;
  }

  public getEmployeeInfo(): string {
    return `Name: ${this.name}, Position: ${this.position}`;
  }
}

const emp = new Employee("Alice", 75000, "Developer", "Engineering");
console.log(emp.getEmployeeInfo());

// Exercise 2: Readonly Properties in a Class
class Product {
  readonly id: number;
  public name: string;
  public price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  getProductInfo(): string {
    return `Product: ${this.name}, Price: $${this.price}`;
  }
}

const item = new Product(101, "Laptop", 1200);
console.log(item.getProductInfo());

// Exercise 3: Class Inheritance


class Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): string {
    return "Some generic animal sound";
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  override makeSound(): string {
    return "bark";
  }
}

const myDog = new Dog("Buddy");
console.log(myDog.makeSound()); 

// Exercise 4: Static Properties and Methods

class Calculator {
  static add(a: number, b: number): number {
    return a + b;
  }

  static subtract(a: number, b: number): number {
    return a - b;
  }
}

console.log(Calculator.add(10, 5));      
console.log(Calculator.subtract(10, 5)); 
// Exercise 5: Extending Interfaces with Optional and Readonly Properties

interface User {
  readonly id: number;
  name: string;
  email: string;
}

interface PremiumUser extends User {
  membershipLevel?: string;
}

function printUserDetails(user: PremiumUser): void {
  console.log(`ID: ${user.id}`);
  console.log(`Name: ${user.name}`);
  console.log(`Email: ${user.email}`);
  if (user.membershipLevel) {
    console.log(`Membership Level: ${user.membershipLevel}`);
  }
}

const premiumMember: PremiumUser = {
  id: 1,
  name: "Sarah",
  email: "sarah@example.com",
  membershipLevel: "Gold"
};

printUserDetails(premiumMember);