const _ = require('lodash');
const { add, multiply } = require('./math');

const numbers = [2, 4, 6];
console.log(`Sum: ${_.sum(numbers)}`);
console.log(`Addition: ${add(3, 5)}`);
console.log(`Multiplication: ${multiply(3, 5)}`);
