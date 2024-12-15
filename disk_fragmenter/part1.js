const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

function defrag(str) {
  const fileArr = [];
  let checkSum = 0;

  let fileIndex = 0;
  let isFile = true;

  for (let c = 0; c < str.length; c++) {
    let segment = "";
    const size = Number(str[c]);

    if (isFile) {
      segment = fileIndex;
      fileIndex += 1;
    } else {
      segment = ".";
    }
    for (let i = 0; i < size; i++) {
      fileArr.push(segment);
    }
    isFile = !isFile;
  }

  let start = 0;
  let end = fileArr.length - 1;

  while (start < end) {
    if (fileArr[start] === ".") {
      if (fileArr[end] !== ".") {
        fileArr[start] = fileArr[end];
        fileArr[end] = ".";
        end -= 1;
        start += 1;
      } else {
        end -= 1;
      }
    } else start += 1;
  }

  let fIndex = 0;
  while (fileArr[fIndex] !== ".") {
    checkSum = checkSum + fIndex * fileArr[fIndex];
    fIndex += 1;
  }

  return checkSum;
}

console.log(defrag(input));
