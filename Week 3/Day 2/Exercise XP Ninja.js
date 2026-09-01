// Exercise 1: Random Number
const randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(`Random number: ${randomNumber}`);

for (let i = 0; i <= randomNumber; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// Exercise 2: Capitalized letters
function capitalize(str) {
  const evenCap = [...str]
    .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char))
    .join('');

  const oddCap = [...str]
    .map((char, index) => (index % 2 !== 0 ? char.toUpperCase() : char))
    .join('');

  return [evenCap, oddCap];
}

console.log(capitalize('abcdef')); // ['AbCdEf', 'aBcDeF']

// Exercise 3: Is palindrome?
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

console.log(isPalindrome('madam')); // true
console.log(isPalindrome('hello')); // false

// Exercise 4: Biggest Number
function biggestNumberInArray(arrayNumber) {
  if (!Array.isArray(arrayNumber) || arrayNumber.length === 0) {
    return 0;
  }

  const numbers = arrayNumber.filter(value => typeof value === 'number' && !Number.isNaN(value));

  if (numbers.length === 0) {
    return 0;
  }

  return Math.max(...numbers);
}

console.log(biggestNumberInArray([-1, 0, 3, 100, 99, 2, 99])); // 100
console.log(biggestNumberInArray(['a', 3, 4, 2])); // 4
console.log(biggestNumberInArray([])); // 0

// Exercise 5: Unique Elements
function uniqueElements(arr) {
  return [...new Set(arr)];
}

console.log(uniqueElements([1, 2, 3, 3, 3, 3, 4, 5])); // [1, 2, 3, 4, 5]

// Exercise 6: Calendar
function createCalendar(year, month) {
  const table = document.createElement('table');
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const headerRow = document.createElement('tr');
  weekdays.forEach(day => {
    const th = document.createElement('th');
    th.textContent = day;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  const firstDayIndex = (firstDay.getDay() + 6) % 7;

  let row = document.createElement('tr');

  for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement('td');
    row.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    if (row.children.length === 7) {
      table.appendChild(row);
      row = document.createElement('tr');
    }

    const cell = document.createElement('td');
    cell.textContent = day;
    row.appendChild(cell);
  }

  while (row.children.length < 7) {
    const emptyCell = document.createElement('td');
    row.appendChild(emptyCell);
  }

  table.appendChild(row);
  document.body.appendChild(table);
}

createCalendar(2012, 9);
