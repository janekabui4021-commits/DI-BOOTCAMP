const fs = require("node:fs");
const path = require("node:path");

function displayFileInfo() {
  const filePath = path.join(__dirname, "data", "example.txt");
  const exists = fs.existsSync(filePath);

  console.log(`File exists: ${exists}`);
  if (!exists) {
    return;
  }

  const fileStats = fs.statSync(filePath);
  console.log(`File size: ${fileStats.size} bytes`);
  console.log(`Created: ${fileStats.birthtime.toISOString()}`);
}

module.exports = displayFileInfo;
