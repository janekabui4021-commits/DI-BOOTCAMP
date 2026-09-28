// ==========================================
// EXERCISE 1: File Management & Path Manipulation
// ==========================================
// Terminal setup commands:
// mkdir file-management && cd file-management
// npm init -y
// mkdir data
// echo "Hello, Node.js!" > data/example.txt

// --- file-info.js ---
const fs = require('fs');
const path = require('path');

function getFileInfo() {
  const filePath = path.join(__dirname, 'data', 'example.txt');
  const fileExists = fs.existsSync(filePath);

  console.log(`File Exists: ${fileExists}`);

  if (fileExists) {
    const stats = fs.statSync(filePath);
    console.log(`File Size: ${stats.size} bytes`);
    console.log(`Creation Time: ${stats.birthtime}`);
  }
}

module.exports = getFileInfo;

// --- app.js (Exercise 1) ---
// const getFileInfo = require('./file-info');
// getFileInfo();


// ==========================================
// EXERCISE 2: Fetching Data with Axios
// ==========================================
// Terminal setup commands:
// mkdir axios-example && cd axios-example
// npm init -y
// npm install axios

// --- fetch-data.js ---
const axios = require('axios');

async function fetchPostTitles() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;
    
    console.log('--- Post Titles ---');
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
    });
  } catch (error) {
    console.error('Error fetching posts:', error.message);
  }
}

module.exports = fetchPostTitles;

// --- app.js (Exercise 2) ---
// const fetchPostTitles = require('./fetch-data');
// fetchPostTitles();


// ==========================================
// EXERCISE 3: Dates with date-fns
// ==========================================
// Terminal setup commands:
// mkdir date-fns-usage && cd date-fns-usage
// npm init -y
// npm install date-fns

// --- date-operations.js ---
const { addDays, format } = require('date-fns');

function performDateOperations() {
  const currentDate = new Date();
  const futureDate = addDays(currentDate, 5);
  const formattedDate = format(futureDate, 'yyyy-MM-dd HH:mm:ss');

  console.log(`Current Date: ${currentDate}`);
  console.log(`Formatted Date (5 days later): ${formattedDate}`);
}

module.exports = performDateOperations;

// --- app.js (Exercise 3) ---

// EXERCISE 4: Faker Module (+ Prompt Bonus)
// ==========================================
// Terminal setup command:
// npm install @faker-js/faker prompt-sync

const { faker } = require('@faker-js/faker');
const prompt = require('prompt-sync')();

const users = [];

function addFakeUser() {
  const user = {
    name: faker.person.fullName(),
    street: faker.location.streetAddress(),
    country: faker.location.country()
  };
  users.push(user);
}

// Bonus: Prompt user for manual entry
function addUserFromPrompt() {
  console.log('\n--- Enter User Details Manually ---');
  const name = prompt('Name: ');
  const street = prompt('Street Address: ');
  const country = prompt('Country: ');

  users.push({ name, street, country });
}

// EXERCISE 5: Regular Expression #1 (Extract Numbers)
// ==========================================
function returnNumbers(str) {
  const matches = str.match(/\d+/g);
  return matches ? matches.join('') : '';
}


// EXERCISE 6: Regular Expression #2 (Validate Name)
// ==========================================
function validateFullName(fullName) {
  // Matches: Two capitalized words separated by a single space containing only letters
  const nameRegex = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
  return nameRegex.test(fullName);
}

function promptAndValidateName() {
  const name = prompt('Please enter your full name (e.g., "John Doe"): ');
  const isValid = validateFullName(name);

  if (isValid) {
    console.log(`"${name}" is a valid full name.`);
  } else {
    console.log(`"${name}" is INVALID. Ensure only letters, 1 space, and both names start with capital letters.`);
  }
}