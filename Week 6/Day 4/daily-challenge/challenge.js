const { greet } = require('./greeting');
const { displayColorfulMessage } = require('./colorful-message');
const { readFileContent } = require('./read-file');

async function runChallenge() {
  console.log(greet('Student'));
  displayColorfulMessage();
  console.log((await readFileContent()).trim());
}

runChallenge().catch((error) => {
  console.error('Challenge failed:', error.message);
  process.exitCode = 1;
});
