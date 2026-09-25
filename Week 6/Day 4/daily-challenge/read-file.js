const fs = require('fs').promises;
const path = require('path');

async function readFileContent() {
  const filePath = path.join(__dirname, 'files', 'file-data.txt');
  return fs.readFile(filePath, 'utf8');
}

module.exports = { readFileContent };
