const fs = require("node:fs");

const files = fs.readdirSync(".");
console.log(files.join("\n"));
