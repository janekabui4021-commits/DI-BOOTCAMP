
// 1. greeting.js
// ==========================================
function greet(name) {
  return `Hello, ${name}! Welcome to the Node.js Daily Challenge.`;
}

module.exports = greet;


// ==========================================
// 2. colorful-message.js
// ==========================================
const chalk = require('chalk');

function displayColorfulMessage() {
  const message = chalk.bold.cyan('This is a bright and colorful message!');
  console.log(message);
}

module.exports = displayColorfulMessage;



// 3. read-file.js
// ==========================================
const fs = require('fs');
const path = require('path');

function readFileContent() {
  const filePath = path.join(__dirname, 'files', 'file-data.txt');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err.message);
      return;
    }
    console.log('File Content:', data);
  });
}

module.exports = readFileContent;



// 4. challenge.js (Integrating Everything)
// ==========================================
const greet = require('./greeting');
const displayColorfulMessage = require('./colorful-message');
const readFileContent = require('./read-file');

function runChallenge() {
  console.log('--- Task 1: Basic Module ---');
  console.log(greet('Developer'));

  console.log('\n--- Task 2: NPM Module ---');
  displayColorfulMessage();

  console.log('\n--- Task 3: File Operations ---');
  readFileContent();
}

runChallenge();