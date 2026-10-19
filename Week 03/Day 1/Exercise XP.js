// Exercise 1: List of people
const people = ["Greg", "Mary", "Devon", "James"];

// Part I - Review about arrays
people.shift(); // Remove Greg
people[people.indexOf("James")] = "Jason"; // Replace James with Jason
people.push("YourName"); // Add your name to the end
console.log(people.indexOf("Mary")); // Mary index

const peopleCopy = people.slice(1, 3);
console.log(peopleCopy);

console.log(people.indexOf("Foo")); // -1 because Foo is not in the array

const last = people[people.length - 1];
console.log(last);

// Part II - Loops
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
}

for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
  if (people[i] === "Devon") {
    break;
  }
}

// Exercise 2: Your favorite colors
const colors = ["Blue", "Red", "Green", "Yellow", "Purple"];

for (let i = 0; i < colors.length; i++) {
  console.log(`My #${i + 1} choice is ${colors[i]}`);
}

const suffixes = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];
for (let i = 0; i < colors.length; i++) {
  const suffix = suffixes[i + 1] || "th";
  console.log(`My ${i + 1}${suffix} choice is ${colors[i]}`);
}

// Exercise 3: Repeat the question
let number = prompt("Enter a number:");
number = Number(number);

while (number < 10) {
  number = Number(prompt("Enter a new number bigger than or equal to 10:"));
}

// Exercise 4: Building Management
const building = {
  numberOfFloors: 4,
  numberOfAptByFloor: {
    firstFloor: 3,
    secondFloor: 4,
    thirdFloor: 9,
    fourthFloor: 2,
  },
  nameOfTenants: ["Sarah", "Dan", "David"],
  numberOfRoomsAndRent: {
    sarah: [3, 990],
    dan: [4, 1000],
    david: [1, 500],
  },
};

console.log(building.numberOfFloors);
console.log(building.numberOfAptByFloor.firstFloor + building.numberOfAptByFloor.thirdFloor);
console.log(building.nameOfTenants[1], building.numberOfRoomsAndRent.dan[0]);

if (building.numberOfRoomsAndRent.sarah[1] + building.numberOfRoomsAndRent.david[1] > building.numberOfRoomsAndRent.dan[1]) {
  building.numberOfRoomsAndRent.dan[1] = 1200;
}
console.log(building.numberOfRoomsAndRent.dan);

// Exercise 5: Family
const family = {
  father: "John",
  mother: "Mary",
  son: "Alex",
  daughter: "Emma",
};

for (const key in family) {
  console.log(key);
}

for (const key in family) {
  console.log(family[key]);
}

// Exercise 6: Rudolf
const details = {
  my: "name",
  is: "Rudolf",
  the: "reindeer",
};

let sentence = "";
for (const key in details) {
  sentence += `${key} ${details[key]} `;
}
console.log(sentence.trim());

// Exercise 7: Secret Group
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];
const sortedNames = [...names].sort();
const secretSociety = sortedNames.map(name => name[0]).join("");
console.log(secretSociety);
