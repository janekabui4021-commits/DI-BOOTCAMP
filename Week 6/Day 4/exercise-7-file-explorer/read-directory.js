const fs = require('fs').promises;

async function readDirectory() {
  const files = await fs.readdir(__dirname);
  console.log(files.join('\n'));
}

readDirectory().catch((error) => {
  console.error('Directory read failed:', error.message);
  process.exitCode = 1;
});
