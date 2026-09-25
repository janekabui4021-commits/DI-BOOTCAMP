const path = require('path');
const { readFile, writeFile } = require('./fileManager');

async function main() {
  const helloPath = path.join(__dirname, 'Hello World.txt');
  const byePath = path.join(__dirname, 'Bye World.txt');
  const content = await readFile(helloPath);

  console.log(`Read from Hello World.txt: ${content.trim()}`);
  await writeFile(byePath, 'Writing to the file');
  console.log('Bye World.txt was updated successfully.');
}

main().catch((error) => {
  console.error('File operation failed:', error.message);
  process.exitCode = 1;
});
