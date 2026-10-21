// Exercise 1: Class inheritance with protected access modifiers
class Employee {
	protected name: string;
	protected salary: number;

	constructor(name: string, salary: number) {
		this.name = name;
		this.salary = salary;
	}

	getDetails(): string {
		return `${this.name} earns $${this.salary}.`;
	}
}

class Manager extends Employee {
	public department: string;

	constructor(name: string, salary: number, department: string) {
		super(name, salary);
		this.department = department;
	}

	override getDetails(): string {
		return `${super.getDetails()} Department: ${this.department}.`;
	}
}

const manager = new Manager("Sarah", 85000, "Engineering");
console.log(manager.getDetails());

// Exercise 2: Readonly properties with access modifiers
class Car {
	public readonly make: string;
	private readonly model: string;
	public year: number;

	constructor(make: string, model: string, year: number) {
		this.make = make;
		this.model = model;
		this.year = year;
	}

	getCarDetails(): string {
		return `${this.make} ${this.model} (${this.year})`;
	}
}

const car = new Car("Toyota", "Corolla", 2024);
console.log(car.getCarDetails());

// These assignments are rejected by TypeScript because both properties are readonly.
// car.make = "Honda";
// car.model = "Civic";
car.year = 2025;

// Exercise 3: Static properties and methods
class MathUtils {
	static readonly PI = 3.14159;

	static circumference(radius: number): number {
		return 2 * MathUtils.PI * radius;
	}
}

console.log(MathUtils.circumference(5));

// Exercise 4: Interface with a function type
interface Operation {
	operate: (firstNumber: number, secondNumber: number) => number;
}

class Addition implements Operation {
	operate = (firstNumber: number, secondNumber: number): number => {
		return firstNumber + secondNumber;
	};
}

class Multiplication implements Operation {
	operate = (firstNumber: number, secondNumber: number): number => {
		return firstNumber * secondNumber;
	};
}

const addition = new Addition();
const multiplication = new Multiplication();
console.log(addition.operate(6, 4));
console.log(multiplication.operate(6, 4));

// Exercise 5: Extending interfaces with readonly properties
interface Shape {
	color: string;
	getArea(): number;
}

interface Rectangle extends Shape {
	readonly width: number;
	readonly height: number;
	getPerimeter(): number;
}

class ColoredRectangle implements Rectangle {
	public color: string;
	public readonly width: number;
	public readonly height: number;

	constructor(color: string, width: number, height: number) {
		this.color = color;
		this.width = width;
		this.height = height;
	}

	getArea(): number {
		return this.width * this.height;
	}

	getPerimeter(): number {
		return 2 * (this.width + this.height);
	}
}

const rectangle = new ColoredRectangle("blue", 10, 5);
console.log(`Color: ${rectangle.color}`);
console.log(`Area: ${rectangle.getArea()}`);
console.log(`Perimeter: ${rectangle.getPerimeter()}`);
