// ============================================================================
// EXERCISE 1: Node.js Application with Advanced Features (ninja-utility)
// ============================================================================
//
// Setup instructions:
// mkdir ninja-utility && cd ninja-utility
// npm init -y
// npm install commander axios chalk@4.1.2
// mkdir commands

// ----------------------------------------------------------------------------
// File: commands/greet.js
// ----------------------------------------------------------------------------
const chalk = require('chalk');

function greetCommand(name = 'Developer') {
  console.log(chalk.bold.green(`Hello, ${name}! Welcome to the Ninja Utility CLI! 🥷`));
}

module.exports = greetCommand;

// ----------------------------------------------------------------------------
// File: commands/fetch.js
// ----------------------------------------------------------------------------
const axios = require('axios');

async function fetchCommand() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    console.log('Fetched Data:');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

module.exports = fetchCommand;

// ----------------------------------------------------------------------------
// File: commands/read.js
// ----------------------------------------------------------------------------
const fs = require('fs');
const path = require('path');

function readCommand(filePath) {
  const absolutePath = path.resolve(filePath);
  
  fs.readFile(absolutePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file at "${filePath}":`, err.message);
      return;
    }
    console.log('--- File Content ---');
    console.log(data);
  });
}

module.exports = readCommand;

// ----------------------------------------------------------------------------
// File: index.js (for ninja-utility)
// ----------------------------------------------------------------------------
const { program } = require('commander');
const greetCommand = require('./commands/greet');
const fetchCommand = require('./commands/fetch');
const readCommand = require('./commands/read');

program
  .version('1.0.0')
  .description('Ninja Utility CLI');

program
  .command('greet [name]')
  .description('Display a colorful greeting message')
  .action((name) => {
    greetCommand(name);
  });

program
  .command('fetch')
  .description('Fetch data from a public API')
  .action(() => {
    fetchCommand();
  });

program
  .command('read <filepath>')
  .description('Read and display content of a specified file')
  .action((filepath) => {
    readCommand(filepath);
  });

program.parse(process.argv);


// ============================================================================
// EXERCISE 2: Building a Weather Dashboard (weather-dashboard)
// ============================================================================
//
// Setup instructions:
// mkdir weather-dashboard && cd weather-dashboard
// npm init -y
// npm install axios chalk@4.1.2

// ----------------------------------------------------------------------------
// File: weather.js
// ----------------------------------------------------------------------------
const axios = require('axios');
const chalk = require('chalk');

async function getWeather(cityName) {
  try {
    // Open-Meteo Geocoding API to resolve city coordinates
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;
    const geoRes = await axios.get(geoUrl);

    if (!geoRes.data.results || geoRes.data.results.length === 0) {
      console.log(chalk.red(`City "${cityName}" not found.`));
      return;
    }

    const { latitude, longitude, name, country } = geoRes.data.results[0];

    // Open-Meteo Weather API for current weather data
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherRes = await axios.get(weatherUrl);

    const { temperature, windspeed } = weatherRes.data.current_weather;

    console.log(chalk.cyan.bold(`\n--- Weather for ${name}, ${country} ---`));
    console.log(chalk.yellow(`Temperature: ${temperature}°C`));
    console.log(chalk.blue(`Wind Speed: ${windspeed} km/h`));
  } catch (error) {
    console.error(chalk.red('Failed to retrieve weather information:'), error.message);
  }
}

module.exports = getWeather;

// ----------------------------------------------------------------------------
// File: dashboard.js
// ----------------------------------------------------------------------------
const readline = require('readline');
const getWeather = require('./weather');

function startDashboard() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter a city name: ', async (cityName) => {
    if (cityName.trim()) {
      await getWeather(cityName.trim());
    } else {
      console.log('City name cannot be empty.');
    }
    rl.close();
  });
}

module.exports = startDashboard;

// File: index.js (for weather-dashboard)
// ----------------------------------------------------------------------------
const startDashboard = require('./dashboard');

startDashboard();