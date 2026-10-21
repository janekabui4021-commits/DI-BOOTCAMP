// Approach 1A: Building the string incrementally
let pattern = "";

for (let i = 1; i <= 6; i++) {
  pattern += "* ";
  console.log(pattern);
}
const maxRows = 6;

for (let row = 1; row <= maxRows; row++) {
  let rowStr = "";
  
  // Inner loop appends a star for each column in the current row
  for (let col = 1; col <= row; col++) {
    rowStr += "* ";
  }
  
  console.log(rowStr);
}