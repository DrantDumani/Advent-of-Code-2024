// every sequence must follow two rules
// sequence must be either all increasing or all decreasing from left to right
// adjacent numbers must differ by at least 1 or at most 3.

// split up input line by line
// loop through input
// for every line, split up that input by space
// if there is no sequence, find out if the difference btwn first two numbers violates the difference rule
// then set the sequence
// if there is a sequence find out if the two numbers violate that rule, then do the above.

const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split(/\n/);

function findUnsafe(reports) {
  let safe = 0;
  for (let i = 0; i < reports.length; i++) {
    let currSeq = 0;
    let isSafe = true;
    const levels = reports[i].split(/\s/).map((el) => Number(el));
    for (let j = 1; j < levels.length; j++) {
      if (!currSeq) {
        currSeq = levels[j] > levels[j - 1] ? 1 : -1;
      }
      const diff = Math.abs(levels[j - 1] - levels[j]);
      if (diff < 1 || diff > 3) {
        isSafe = false;
        break;
      }
      if (
        (currSeq === -1 && levels[j] > levels[j - 1]) ||
        (currSeq === 1 && levels[j] < levels[j - 1])
      ) {
        isSafe = false;
        break;
      }
    }
    if (isSafe) safe += 1;
  }
  return safe;
}

console.log(findUnsafe(input));
