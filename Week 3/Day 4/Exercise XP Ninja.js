// Each call captures one word and returns another function until called empty.
const mergeWords = word => nextWord =>
	nextWord === undefined ? word : mergeWords(`${word} ${nextWord}`);

console.log(mergeWords("Hello")());
console.log(mergeWords("There")("is")("no")("spoon.")());
//