const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .split(/\n/)
  .map((el) => el.split(/:\s|\s/))
  .map((arr) => arr.map((n) => Number(n)));

function sumCalibration(input) {
  let sum = 0;

  const validate = (arr, index, targetNum, num) => {
    if (num > targetNum || index > arr.length - 2) {
      return num;
    } else {
      const num1 = validate(arr, index + 1, targetNum, num + arr[index + 1]);
      const num2 = validate(arr, index + 1, targetNum, num * arr[index + 1]);
      const num3 = validate(
        arr,
        index + 1,
        targetNum,
        Number(`${num}${arr[index + 1]}`)
      );
      if (num1 === targetNum) {
        return num1;
      } else if (num2 === targetNum) {
        return num2;
      } else return num3;
    }
  };

  for (const line of input) {
    const targetNum = line[0];
    if (validate(line, 1, targetNum, line[1]) === targetNum) {
      sum += targetNum;
    }
  }

  return sum;
}

console.log(sumCalibration(input));