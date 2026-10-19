let client = "John";

const groceries = {
	fruits: ["pear", "apple", "banana"],
	vegetables: ["tomatoes", "cucumber", "salad"],
	totalPrice: "20$",
	other: {
		paid: true,
		meansOfPayment: ["cash", "creditCard"]
	}
};

const displayGroceries = () => {
	groceries.fruits.forEach(fruit => console.log(fruit));
};

const cloneGroceries = () => {
	const user = client;
	client = "Betty";

	console.log(`user: ${user}`);
	console.log(`client: ${client}`);
	console.log("user stays John because strings are primitive values copied by value.");

	const shopping = groceries;
	groceries.totalPrice = "35$";
	groceries.other.paid = false;

	console.log(`shopping total price: ${shopping.totalPrice}`);
	console.log(`shopping paid: ${shopping.other.paid}`);
	console.log("shopping changes because shopping and groceries reference the same object.");
};

displayGroceries();
cloneGroceries();
