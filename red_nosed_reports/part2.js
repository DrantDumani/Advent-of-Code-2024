const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n");

function findSafe(reports) {
  let safe = 0;
  for (let report of reports) {
    const levels = report.split(/\s/).map((el) => Number(el));
    const stack = [];
    let dampener = false;
    let isSafe = true;
    let inc = 0;
    let dec = 0;
    for (let i = levels.length - 1; i - 1 >= 0; i--) {
      if (levels[i] > levels[i - 1]) inc += 1;
      else if (levels[i] < levels[i - 1]) dec += 1;
    }
    if (inc === dec) {
      // report is unsafe. Move to the next one
      continue;
    }
    const seqDir = inc > dec ? "inc" : "dec";

    stack.push(levels.pop());
    while (levels.length > 1) {
      if (
        !checkSafety(stack[stack.length - 1], levels[levels.length - 1], seqDir)
      ) {
        if (dampener) {
          isSafe = false;
          break;
        } else {
          dampener = true;
          if (
            checkSafety(
              stack[stack.length - 1],
              levels[levels.length - 2],
              seqDir
            )
          ) {
            levels.pop();
          } else {
            stack.pop();
          }
        }
      } else {
        stack.push(levels.pop());
      }
    }

    // console.log(report, isSafe, seqDir);
    if (isSafe) safe += 1;
  }
  return safe;
}

function checkSafety(prevNum, nextNum, direction) {
  let currDir = "";
  if (prevNum > nextNum) {
    currDir = "inc";
  } else if (prevNum < nextNum) {
    currDir = "dec";
  }

  let diff = Math.abs(prevNum - nextNum);

  if (diff < 1 || diff > 3 || currDir !== direction) {
    return false;
  }
  return true;
}

console.log(findSafe(input));
