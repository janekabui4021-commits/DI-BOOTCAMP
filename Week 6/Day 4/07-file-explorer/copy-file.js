const fs = require("node:fs");

fs.copyFileSync("source.txt", "destination.txt");
console.log("source.txt was copied to destination.txt.");
