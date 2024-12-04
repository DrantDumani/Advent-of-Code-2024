const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

function findRowLength(puzzle) {
  for (let i = 0; i < puzzle.length; i++) {
    if (/\W/.test(puzzle[i])) {
      return i;
    }
  }
}

function findsWords(puzzle) {
  const rowLength = findRowLength(puzzle);
  // right. Remove the new line characters
  const onlyLetters = puzzle.replace(/\W/g, "");
  let wordsFound = 0;

  for (let i = 0; i < onlyLetters.length; i++) {
    if (onlyLetters[i] === "X") {
      wordsFound =
        wordsFound +
        findHorizontal(onlyLetters, i, rowLength) +
        findVertical(onlyLetters, i, rowLength) +
        findDiagonal(onlyLetters, i, rowLength);
    }
  }
  return wordsFound;
}

console.log(findsWords(input));

function findHorizontal(puzzle, xInd, rowLength) {
  let matches = 0;
  let lowRowLimit = Math.floor(xInd / rowLength) * rowLength;
  let hiRowLimit = lowRowLimit + rowLength;

  if (
    xInd + 3 < hiRowLimit &&
    puzzle[xInd + 1] === "M" &&
    puzzle[xInd + 2] === "A" &&
    puzzle[xInd + 3] === "S"
  ) {
    matches += 1;
  }

  if (
    xInd - 3 > lowRowLimit &&
    puzzle[xInd - 1] === "M" &&
    puzzle[xInd - 2] === "A" &&
    puzzle[xInd - 3] === "S"
  ) {
    matches += 1;
  }
  // console.log("ind: ", xInd, "found: ", matches);
  return matches;
}

function findVertical(puzzle, xInd, rowLength) {
  let matches = 0;

  if (
    puzzle[xInd + rowLength] === "M" &&
    puzzle[xInd + rowLength * 2] === "A" &&
    puzzle[xInd + rowLength * 3] === "S"
  ) {
    matches += 1;
  }

  if (
    puzzle[xInd - rowLength] === "M" &&
    puzzle[xInd - rowLength * 2] === "A" &&
    puzzle[xInd - rowLength * 3] === "S"
  ) {
    matches += 1;
  }
  // console.log("ind: ", xInd, "found: ", matches);
  return matches;
}

function findDiagonal(puzzle, xInd, rowLength) {
  let matches = 0;

  if (
    puzzle[xInd + rowLength + 1] === "M" &&
    puzzle[xInd + rowLength * 2 + 2] === "A" &&
    puzzle[xInd + rowLength * 3 + 3] === "S"
  ) {
    matches += 1;
  }

  if (
    puzzle[xInd + rowLength - 1] === "M" &&
    puzzle[xInd + rowLength * 2 - 2] === "A" &&
    puzzle[xInd + rowLength * 3 - 3] === "S"
  ) {
    matches += 1;
  }

  if (
    puzzle[xInd - rowLength - 1] === "M" &&
    puzzle[xInd - rowLength * 2 - 2] === "A" &&
    puzzle[xInd - rowLength * 3 - 3] === "S"
  ) {
    matches += 1;
  }

  if (
    puzzle[xInd - rowLength + 1] === "M" &&
    puzzle[xInd - rowLength * 2 + 2] === "A" &&
    puzzle[xInd - rowLength * 3 + 3] === "S"
  ) {
    matches += 1;
  }
  // console.log("ind: ", xInd, "found: ", matches);
  return matches;
}
