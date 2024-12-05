// try DFS with this problem? Why not
// whenever you encounter an X, begin the search
// look in a direction (left, right, up, down, diag down left, down Right, up right, up left)

const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split(/\n/);

function findsWords(puzzle) {
  let wordsFound = 0;

  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] === "X") {
        // search hori
        if (
          puzzle[i][j + 1] === "M" &&
          puzzle[i][j + 2] === "A" &&
          puzzle[i][j + 3] === "S"
        ) {
          wordsFound += 1;
        }
        if (
          puzzle[i][j - 1] === "M" &&
          puzzle[i][j - 2] === "A" &&
          puzzle[i][j - 3] === "S"
        ) {
          wordsFound += 1;
        }
        // search vert
        if (
          puzzle[i + 1]?.[j] === "M" &&
          puzzle[i + 2]?.[j] === "A" &&
          puzzle[i + 3]?.[j] === "S"
        ) {
          wordsFound += 1;
        }
        if (
          puzzle[i - 1]?.[j] === "M" &&
          puzzle[i - 2]?.[j] === "A" &&
          puzzle[i - 3]?.[j] === "S"
        ) {
          wordsFound += 1;
        }
        // search diag
        if (
          puzzle[i - 1]?.[j - 1] === "M" &&
          puzzle[i - 2]?.[j - 2] === "A" &&
          puzzle[i - 3]?.[j - 3] === "S"
        ) {
          wordsFound += 1;
        }

        if (
          puzzle[i + 1]?.[j - 1] === "M" &&
          puzzle[i + 2]?.[j - 2] === "A" &&
          puzzle[i + 3]?.[j - 3] === "S"
        ) {
          wordsFound += 1;
        }

        if (
          puzzle[i - 1]?.[j + 1] === "M" &&
          puzzle[i - 2]?.[j + 2] === "A" &&
          puzzle[i - 3]?.[j + 3] === "S"
        ) {
          wordsFound += 1;
        }

        if (
          puzzle[i + 1]?.[j + 1] === "M" &&
          puzzle[i + 2]?.[j + 2] === "A" &&
          puzzle[i + 3]?.[j + 3] === "S"
        ) {
          wordsFound += 1;
        }
      }
    }
  }
  return wordsFound;
}

console.log(findsWords(input));

// function findHorizontal(puzzle, xInd, rowLength) {
//   let matches = 0;
//   let lowRowLimit = Math.floor(xInd / rowLength) * rowLength;
//   let hiRowLimit = lowRowLimit + rowLength;

//   if (
//     xInd + 3 < hiRowLimit &&
//     puzzle[xInd + 1] === "M" &&
//     puzzle[xInd + 2] === "A" &&
//     puzzle[xInd + 3] === "S"
//   ) {
//     matches += 1;
//   }

//   if (
//     xInd - 3 >= lowRowLimit &&
//     puzzle[xInd - 1] === "M" &&
//     puzzle[xInd - 2] === "A" &&
//     puzzle[xInd - 3] === "S"
//   ) {
//     matches += 1;
//   }
//   // console.log("hori ", "ind: ", xInd, "found: ", matches);
//   return matches;
// }

// function findVertical(puzzle, xInd, rowLength) {
//   let matches = 0;

//   if (
//     puzzle[xInd + rowLength] === "M" &&
//     puzzle[xInd + rowLength * 2] === "A" &&
//     puzzle[xInd + rowLength * 3] === "S"
//   ) {
//     matches += 1;
//   }

//   if (
//     puzzle[xInd - rowLength] === "M" &&
//     puzzle[xInd - rowLength * 2] === "A" &&
//     puzzle[xInd - rowLength * 3] === "S"
//   ) {
//     matches += 1;
//   }
//   // console.log("vertical", "ind: ", xInd, "found: ", matches);
//   return matches;
// }

// function findDiagonal(puzzle, xInd, rowLength) {
//   let matches = 0;
//   let lowRowLimit = Math.floor(xInd / rowLength) * rowLength;
//   let hiRowLimit = lowRowLimit + rowLength;

//   if (
//     puzzle[xInd + rowLength + 1] === "M" &&
//     puzzle[xInd + rowLength * 2 + 2] === "A" &&
//     puzzle[xInd + rowLength * 3 + 3] === "S"
//   ) {
//     matches += 1;
//   }

//   if (
//     puzzle[xInd + rowLength - 1] === "M" &&
//     puzzle[xInd + rowLength * 2 - 2] === "A" &&
//     puzzle[xInd + rowLength * 3 - 3] === "S"
//   ) {
//     matches += 1;
//   }

//   if (
//     puzzle[xInd - rowLength - 1] === "M" &&
//     puzzle[xInd - rowLength * 2 - 2] === "A" &&
//     puzzle[xInd - rowLength * 3 - 3] === "S"
//   ) {
//     matches += 1;
//   }

//   if (
//     puzzle[xInd - rowLength + 1] === "M" &&
//     puzzle[xInd - rowLength * 2 + 2] === "A" &&
//     puzzle[xInd - rowLength * 3 + 3] === "S"
//   ) {
//     matches += 1;
//   }
//   // console.log("diag ", "ind: ", xInd, "found: ", matches);
//   return matches;
// }
