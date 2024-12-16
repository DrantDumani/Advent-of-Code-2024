const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n");

function trailScore(map) {
  let scoreSum = 0;

  const searchTrail = (y, x, prev, found) => {
    // base case
    // if tile doesn't exist, if it's not greater than the previous step by 1, or if it's been found already, stop
    if (
      !map[y] ||
      !map[y][x] ||
      Number(map[y][x]) !== Number(prev) + 1 ||
      found[`${y},${x}`]
    ) {
      return 0;
    } else {
      found[`${y},${x}`] = true;
      if (map[y][x] === "9") {
        scoreSum += 1;
      } else {
        searchTrail(y, x + 1, map[y][x], found);
        searchTrail(y, x - 1, map[y][x], found);
        searchTrail(y + 1, x, map[y][x], found);
        searchTrail(y - 1, x, map[y][x], found);
      }
    }
  };

  // loop through the map
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      // look for trailheads
      if (map[y][x] === "0") {
        const trail = {};
        searchTrail(y, x, -1, trail);
      }
    }
  }

  return scoreSum;
}

console.log(trailScore(input));
