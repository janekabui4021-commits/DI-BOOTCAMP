// Exercise 1: is_Blank
function isBlank(str) {
  return str.trim().length === 0;
}

console.log(isBlank(''));      // true
console.log(isBlank('abc'));   // false

// Exercise 2: Abbrev_name
function abbrevName(name) {
  const parts = name.trim().split(/\s+/);

  if (parts.length < 2) {
    return parts[0] || '';
  }

  return `${parts[0]} ${parts[1][0].toUpperCase()}.`;
}

console.log(abbrevName('Robin Singh')); // Robin S.

// Exercise 3: SwapCase
function swapCase(str) {
  return [...str]
    .map(char => {
      if (char === char.toUpperCase() && char !== char.toLowerCase()) {
        return char.toLowerCase();
      }
      return char.toUpperCase();
    })
    .join('');
}

console.log(swapCase('The Quick Brown Fox')); // tHE qUICK bROWN fOX

// Exercise 4: Omnipresent value
function isOmnipresent(arr, value) {
  return arr.every(subArray => subArray.includes(value));
}

console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1)); // true
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6)); // false

// Exercise 5: Red table
const table = document.body.firstElementChild;

if (table) {
  for (let rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
    const cell = table.rows[rowIndex].cells[rowIndex];
    if (cell) {
      cell.style.backgroundColor = 'red';
    }
  }
}
