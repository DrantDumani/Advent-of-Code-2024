const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split(/\n/);

function findcrossMas(puzzle) {
  let wordsFound = 0;

  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] === "A") {
        // search diagonally
        if (
          ((puzzle[i - 1]?.[j - 1] === "S" && puzzle[i + 1]?.[j + 1] === "M") ||
            (puzzle[i - 1]?.[j - 1] === "M" &&
              puzzle[i + 1]?.[j + 1] === "S")) &&
          ((puzzle[i - 1]?.[j + 1] === "S" && puzzle[i + 1]?.[j - 1] === "M") ||
            (puzzle[i - 1]?.[j + 1] === "M" && puzzle[i + 1]?.[j - 1] === "S"))
        ) {
          wordsFound += 1;
        }
      }
    }
  }
  return wordsFound;
}

console.log(findcrossMas(input));
