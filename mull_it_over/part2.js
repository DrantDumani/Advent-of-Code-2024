const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

function parseMult(str) {
  // try to obtain just the correct mult sections
  const uncorrupted = str.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g);
  const mul = (x, y) => x * y;

  let prodSum = 0;
  let canDo = true;

  for (let fn of uncorrupted) {
    if (fn === "do()") {
      canDo = true;
    } else if (fn === "don't()") {
      canDo = false;
    } else {
      if (canDo) {
        prodSum += eval(fn);
      }
    }
  }
  return prodSum;
}

console.log(parseMult(input));
