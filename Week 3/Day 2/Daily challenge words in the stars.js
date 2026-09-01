function printWordsInFrame() {
  let input = '';

  if (typeof prompt === 'function') {
    input = prompt('Enter several words separated by commas:');
  } else {
    input = 'Hello, World, in, a, frame';
    console.log('No browser prompt available, using default sample input.');
  }

  if (!input) {
    console.log('No input provided.');
    return;
  }

  const words = input
    .split(',')
    .map(word => word.trim())
    .filter(word => word.length > 0);

  if (words.length === 0) {
    console.log('No valid words were entered.');
    return;
  }

  const longestWordLength = Math.max(...words.map(word => word.length));
  const border = '*'.repeat(longestWordLength + 4);

  console.log(border);

  words.forEach(word => {
    const padding = ' '.repeat(longestWordLength - word.length);
    console.log(`* ${word}${padding} *`);
  });

  console.log(border);
}

 printWordsInFrame();
