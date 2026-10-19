// Exercise 1: Advanced access modifiers and inheritance
class Employee {
	public name: string;
	private age: number;
	protected salary: number;

	constructor(name: string, age: number, salary: number) {
		this.name = name;
		this.age = age;
		this.salary = salary;
	}

	protected calculateBonus(): number {
		return this.salary * 0.1;
	}

	getSalaryDetails(): string {
		return `${this.name}'s salary is $${this.salary}.`;
	}

	getAge(): number {
		return this.age;
	}
}

class Manager extends Employee {
	override getSalaryDetails(): string {
		const bonus = this.calculateBonus();
		return `${super.getSalaryDetails()} Bonus: $${bonus}.`;
	}
}

class ExecutiveManager extends Manager {
	approveBudget(amount: number): string {
		return `${this.name} approved a budget of $${amount}.`;
	}
}

const executiveManager = new ExecutiveManager("Alex", 42, 120000);
console.log(executiveManager.getSalaryDetails());
console.log(executiveManager.approveBudget(50000));
console.log(`Age: ${executiveManager.getAge()}`);

// Exercise 2: Advanced static methods and properties
class Shape {
	static totalShapes = 0;

	constructor() {
		Shape.totalShapes += 1;
	}

	static getType(): string {
		return "Shape";
	}
}

class Circle extends Shape {
	constructor(public radius: number) {
		super();
	}

	area(): number {
		return Math.PI * this.radius ** 2;
	}

	static override getType(): string {
		return "Circle";
	}
}

class Square extends Shape {
	constructor(public side: number) {
		super();
	}

	area(): number {
		return this.side ** 2;
	}

	static override getType(): string {
		return "Square";
	}
}

const circle = new Circle(5);
const square = new Square(4);
console.log(`${Circle.getType()} area: ${circle.area()}`);
console.log(`${Square.getType()} area: ${square.area()}`);
console.log(`Total shapes: ${Shape.totalShapes}`);

// Exercise 3: Complex interfaces with function types
type Operation = (firstNumber: number, secondNumber: number) => number;

interface Calculator {
	a: number;
	b: number;
	operate(operation: Operation): number;
}

class AdvancedCalculator implements Calculator {
	constructor(public a: number, public b: number) {}

	operate(operation: Operation): number {
		return operation(this.a, this.b);
	}

	add(): number {
		return this.operate((firstNumber, secondNumber) => firstNumber + secondNumber);
	}

	subtract(): number {
		return this.operate((firstNumber, secondNumber) => firstNumber - secondNumber);
	}

	multiply(): number {
		return this.operate((firstNumber, secondNumber) => firstNumber * secondNumber);
	}
}

const calculator = new AdvancedCalculator(12, 4);
console.log(`Add: ${calculator.add()}`);
console.log(`Subtract: ${calculator.subtract()}`);
console.log(`Multiply: ${calculator.multiply()}`);

// Exercise 4: Readonly properties in inheritance
class Device {
	constructor(public readonly serialNumber: string) {}

	getInfo(): string {
		return `Serial number: ${this.serialNumber}`;
	}
}

class Laptop extends Device {
	constructor(
		serialNumber: string,
		public model: string,
		public price: number,
	) {
		super(serialNumber);
	}

	override getInfo(): string {
		return `${super.getInfo()}, Model: ${this.model}, Price: $${this.price}.`;
	}
}

const laptop = new Laptop("SN-2026-001", "ThinkPad", 1400);
laptop.model = "ThinkPad X1";
laptop.price = 1500;
console.log(laptop.getInfo());

// Exercise 5: Extending multiple interfaces with optional and readonly properties
interface Product {
	readonly name: string;
	price: number;
	discount?: number;
}

interface Electronics extends Product {
	warrantyPeriod: number;
}

class Smartphone implements Electronics {
	public readonly name: string;
	public price: number;
	public warrantyPeriod: number;
	public discount?: number;

	constructor(
		name: string,
		price: number,
		warrantyPeriod: number,
		discount?: number,
	) {
		this.name = name;
		this.price = price;
		this.warrantyPeriod = warrantyPeriod;

		if (discount !== undefined) {
			this.discount = discount;
		}
	}

	getPriceAfterDiscount(): number {
		const discountAmount = this.discount ?? 0;
		return this.price * (1 - discountAmount / 100);
	}
}

const smartphone = new Smartphone("Pixel", 800, 24, 10);
console.log(`${smartphone.name}: $${smartphone.getPriceAfterDiscount()}`);
