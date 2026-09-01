// Exercise 1: Find numbers divisible by 23
function displayNumbersDivisible(divisor = 23) {
  let sum = 0;
  const numbers = [];

  for (let i = 0; i <= 500; i++) {
    if (i % divisor === 0) {
      numbers.push(i);
      sum += i;
    }
  }

  console.log(numbers.join(" "));
  console.log("Sum:", sum);
}

displayNumbersDivisible();

displayNumbersDivisible(3);

displayNumbersDivisible(45);

// Exercise 2: Shopping List
const stock = {
  banana: 6,
  apple: 0,
  pear: 12,
  orange: 32,
  blueberry: 1,
};

const prices = {
  banana: 4,
  apple: 2,
  pear: 1,
  orange: 1.5,
  blueberry: 10,
};

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
  let total = 0;

  for (let i = 0; i < shoppingList.length; i++) {
    const item = shoppingList[i];

    if (item in stock && stock[item] > 0) {
      total += prices[item];
      stock[item] -= 1;
    }
  }

  return total;
}

console.log("Total bill:", myBill());

// Exercise 3: What's in my wallet?
function changeEnough(itemPrice, amountOfChange) {
  const coinValues = [0.25, 0.1, 0.05, 0.01];
  let total = 0;

  for (let i = 0; i < amountOfChange.length; i++) {
    total += amountOfChange[i] * coinValues[i];
  }

  return total >= itemPrice;
}

console.log(changeEnough(4.25, [25, 20, 5, 0]));
console.log(changeEnough(14.11, [2, 100, 0, 0]));
console.log(changeEnough(0.75, [0, 0, 20, 5]));

// Exercise 4: Vacation Costs
function promptOrDefault(message, fallback) {
  if (typeof prompt === "function") {
    return prompt(message);
  }

  return fallback;
}

function hotelCost() {
  let nights;

  do {
    nights = Number(promptOrDefault("How many nights would you like to stay?", 3));
  } while (isNaN(nights) || nights <= 0 || nights === undefined);

  return nights * 140;
}

function planeRideCost() {
  let destination;

  do {
    destination = promptOrDefault("Where are you flying to?", "Paris");
  } while (destination === null || destination === "" || typeof destination !== "string");

  if (destination === "London") {
    return 183;
  } else if (destination === "Paris") {
    return 220;
  } else {
    return 300;
  }
}

function rentalCarCost() {
  let days;

  do {
    days = Number(promptOrDefault("How many days do you want to rent the car?", 5));
  } while (isNaN(days) || days <= 0 || days === undefined);

  let total = days * 40;

  if (days > 10) {
    total = total * 0.95;
  }

  return total;
}

function totalVacationCost() {
  const hotel = hotelCost();
  const plane = planeRideCost();
  const car = rentalCarCost();
  const total = hotel + plane + car;

  console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}.`);
  console.log(`Total vacation cost: $${total}`);
}

if (typeof document !== "undefined") {
  totalVacationCost();
}

// Exercise 5: Users
if (typeof document !== "undefined") {
  const container = document.getElementById("container");
  console.log(container);

  const listItems = document.querySelectorAll(".list li");
  listItems[1].textContent = "Richard";

  const secondList = document.querySelectorAll(".list")[1];
  secondList.querySelectorAll("li")[1].remove();

  const allLists = document.querySelectorAll(".list");
  for (let i = 0; i < allLists.length; i++) {
    allLists[i].querySelector("li").textContent = "YourName";
  }

  allLists.forEach((ul) => {
    ul.classList.add("student_list");
  });
  allLists[0].classList.add("university", "attendance");
  container.style.backgroundColor = "lightblue";
  container.style.padding = "10px";
  const danItem = document.querySelector("li:last-child");
  danItem.style.display = "none";
  const richardItem = document.querySelector("li:nth-child(2)");
  richardItem.style.border = "2px solid black";
  document.body.style.fontSize = "18px";

  if (container.style.backgroundColor === "lightblue") {
    alert("Hello John and Sarah");
  }

  // Exercise 6: Change the navbar
  const navBar = document.getElementById("navBar");
  navBar.setAttribute("id", "socialNetworkNavigation");

  const ul = navBar.querySelector("ul");
  const newLi = document.createElement("li");
  const newText = document.createTextNode("Logout");
  newLi.appendChild(newText);
  ul.appendChild(newLi);

  const firstLi = ul.firstElementChild;
  const lastLi = ul.lastElementChild;
  console.log(firstLi.textContent);
  console.log(lastLi.textContent);

  // Exercise 7: My Book List
  const section = document.querySelector(".listBooks");
  const allBooks = [
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      alreadyRead: true,
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      alreadyRead: false,
    },
  ];

  for (let i = 0; i < allBooks.length; i++) {
    const book = allBooks[i];
    const div = document.createElement("div");
    const bookInfo = document.createElement("p");
    const img = document.createElement("img");

    bookInfo.textContent = `${book.title} written by ${book.author}`;
    img.src = book.image;
    img.width = 100;

    if (book.alreadyRead) {
      bookInfo.style.color = "red";
    }

    div.appendChild(img);
    div.appendChild(bookInfo);
    section.appendChild(div);
  }
}
