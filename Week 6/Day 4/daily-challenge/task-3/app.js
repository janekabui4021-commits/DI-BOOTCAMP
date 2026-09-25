const { readFileContent } = require('../read-file');

readFileContent()
  .then((content) => console.log(content.trim()))
  .catch((error) => {
    console.error('Unable to read file:', error.message);
    process.exitCode = 1;
  });
