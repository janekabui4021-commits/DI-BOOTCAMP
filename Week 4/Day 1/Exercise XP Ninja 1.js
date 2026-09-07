//1
const data = [
  { name: 'Butters', age: 3, type: 'dog' },
  { name: 'Cuty', age: 5, type: 'rabbit' },
  { name: 'Lizzy', age: 6, type: 'dog' },
  { name: 'Red', age: 1, type: 'cat' },
  { name: 'Joey', age: 3, type: 'dog' },
  { name: 'Rex', age: 10, type: 'dog' }
];

// 1. Using a loop (for...of)
let loopSum = 0;
for (const item of data) {
  if (item.type === 'dog') {
    loopSum += item.age * 7;
  }
}
console.log('Sum using loop:', loopSum); 

// 2. Using the reduce() method
const reduceSum = data.reduce((acc, item) => {
  return item.type === 'dog' ? acc + item.age * 7 : acc;
}, 0);
console.log('Sum using reduce:', reduceSum); 
const userEmail3 = ' cannotfillemailformcorrectly@gmail.com ';

// Clean up whitespace using trim() or replace()
const cleanedEmail = userEmail3.trim();
console.log(cleanedEmail); // "cannotfillemailformcorrectly@gmail.com"

//3
const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor' },
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor' }
];

const userRoles = {};
users.forEach(({ firstName, lastName, role }) => {
  userRoles[`${firstName} ${lastName}`] = role;
});

console.log(userRoles)
