const fs = require('fs').promises;
const path = require('path');

async function copyFile() {
  const sourcePath = path.join(__dirname, 'source.txt');
  const destinationPath = path.join(__dirname, 'destination.txt');
  const content = await fs.readFile(sourcePath, 'utf8');
  await fs.writeFile(destinationPath, content, 'utf8');
  console.log('source.txt copied to destination.txt.');
}

copyFile().catch((error) => {
  console.error('Copy failed:', error.message);
  process.exitCode = 1;
});
