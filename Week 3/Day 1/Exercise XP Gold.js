// Exercise 1: Checking the BMI
const person1 = {
  fullName: "Alice",
  mass: 68,
  height: 1.7,
  bmi: function () {
    return this.mass / (this.height * this.height);
  },
};

const person2 = {
  fullName: "Bob",
  mass: 90,
  height: 1.8,
  bmi: function () {
    return this.mass / (this.height * this.height);
  },
};

function compareBMI(personA, personB) {
  const bmiA = personA.bmi();
  const bmiB = personB.bmi();

  if (bmiA > bmiB) {
    return `${personA.fullName} has the larger BMI.`;
  } else if (bmiB > bmiA) {
    return `${personB.fullName} has the larger BMI.`;
  } else {
    return "Both people have the same BMI.";
  }
}

console.log(compareBMI(person1, person2));

// Exercise 2: Grade Average
function findAvg(gradesList) {
  let sum = 0;

  for (let i = 0; i < gradesList.length; i++) {
    sum += gradesList[i];
  }

  const average = sum / gradesList.length;
  console.log(`Average: ${average}`);
  return average;
}

function passOrFail(gradesList) {
  const average = findAvg(gradesList);

  if (average > 65) {
    console.log("You passed.");
  } else {
    console.log("You failed and must repeat the course.");
  }
}

const grades = [70, 80, 90, 60, 75];
passOrFail(grades);
