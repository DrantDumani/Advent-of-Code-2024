const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split(" ");

function blinkStone(stones) {
  // convert input to linked list
  const list = createList(stones);
  let rockCount = 0;

  const blinks = 75;
  for (let i = 0; i < blinks; i++) {
    let curr = list;

    while (curr) {
      if (curr.value === "0") {
        curr.value = "1";
      } else if (curr.value.length % 2 === 0) {
        const half = curr.value.length / 2;
        const left = [];
        const right = [];
        let c = 0;
        while (c < half) {
          left.push(curr.value[c]);
          c += 1;
        }

        while (curr.value[c] === "0" && c !== curr.value.length - 1) {
          c += 1;
        }

        while (c < curr.value.length) {
          right.push(curr.value[c]);
          c += 1;
        }

        curr.value = left.join("");
        const moveRight = curr.next;
        const next = { value: right.join(""), next: moveRight };
        curr.next = next;
        curr = curr.next;
      } else {
        curr.value = (Number(curr.value) * 2024).toString();
      }
      curr = curr.next;
    }
  }

  let currRock = list;
  while (currRock) {
    rockCount += 1;
    currRock = currRock.next;
  }

  return rockCount;
}

function createList(input) {
  const list = { value: input[0], next: null };
  let curr = list;

  for (let i = 1; i < input.length; i++) {
    curr.next = { value: input[i], next: null };
    curr = curr.next;
  }
  return list;
}

console.time("blinkStone");
console.log(blinkStone(input));
console.timeEnd("blinkStone");
