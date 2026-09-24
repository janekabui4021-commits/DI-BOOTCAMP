import people from "./data.js";

function printAverageAge(persons) {
  const averageAge =
    persons.reduce((total, person) => total + person.age, 0) / persons.length;

  console.log(`Average age: ${averageAge.toFixed(2)}`);
}

printAverageAge(people);
