const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split(/\n/);

function guardPath(map) {
  const directions = {
    "^": { y: -1, x: 0 },
    ">": { y: 0, x: 1 },
    v: { y: 1, x: 0 },
    "<": { y: 0, x: -1 },
  };

  // find guard's position and direction
  let { dir, currPos } = findGaurdStart(map);
  let dirIndex = Object.keys(directions).indexOf(dir);

  const travel = (y, x) => {
    if (!map[y] || !map[y][x]) {
      return 0;
    } else if (map[y][x] === "#") {
      y -= directions[dir].y;
      x -= directions[dir].x;

      const dirKeys = Object.keys(directions);
      dirIndex = (dirIndex + 1) % dirKeys.length;
      dir = dirKeys[dirIndex];
      return travel(y + directions[dir].y, x + directions[dir].x);
    } else if (map[y][x] === "X") {
      return 0 + travel(y + directions[dir].y, x + directions[dir].x);
    } else {
      console.log(map[y][x], "Should change", y, x);
      map[y][x] = "X";
      console.log(map[y][x]);
      return 1 + travel(y + directions[dir].y, x + directions[dir].x);
    }
  };

  return travel(currPos.y, currPos.x);
}

function findGaurdStart(map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] !== "#" && map[i][j] !== ".") {
        return { dir: map[i][j], currPos: { y: i, x: j } };
      }
    }
  }
}

console.log(guardPath(input));
