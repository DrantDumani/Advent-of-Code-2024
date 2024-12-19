const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split(" ");

function blinkStone(stones) {
  let rocks = createMap(stones);
  let rockCount = 0;
  const blinks = 75;

  for (let i = 0; i < blinks; i++) {
    const newRocks = [];
    for (let r in rocks) {
      if (r === "0") {
        newRocks.push(["1", rocks[r]]);
      } else if (r.length % 2 === 0) {
        const half = r.length / 2;
        const left = [];
        const right = [];
        let c = 0;
        while (c < half) {
          left.push(r[c]);
          c += 1;
        }

        while (r[c] === "0" && c !== r.length - 1) {
          c += 1;
        }

        while (c < r.length) {
          right.push(r[c]);
          c += 1;
        }

        const leftStr = left.join("");
        const rightStr = right.join("");
        newRocks.push([leftStr, rocks[r]]);
        newRocks.push([rightStr, rocks[r]]);
      } else {
        const prod = (Number(r) * 2024).toString();
        newRocks.push([prod, rocks[r]]);
      }
    }

    const nextBlink = {};

    for (let rock of newRocks) {
      nextBlink[rock[0]] = nextBlink[rock[0]] + rock[1] || rock[1];
    }

    rocks = nextBlink;
  }

  for (let k in rocks) {
    rockCount += rocks[k];
  }

  return rockCount;
}

function createMap(input) {
  const map = {};
  for (let i = 0; i < input.length; i++) {
    map[input[i]] = 1;
  }
  return map;
}

console.time("blinkStone");
console.log(blinkStone(input));
console.timeEnd("blinkStone");
