// You specifically want to parse the input so that it only contains mul(number, number)
// then you want to 'run' all of that input, adding up the products of the individual numbers

const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

function parseMult(str) {
  // try to obtain just the correct mult sections
  const uncorrupted = str.match(/mul\(\d+,\d+\)/g);
  const mul = (x, y) => x * y;
  let prodSum = 0;

  for (let fn of uncorrupted) {
    prodSum += eval(fn);
  }
  return prodSum;
}

console.log(parseMult(input));
