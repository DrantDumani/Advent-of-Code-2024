const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .split(/\n/)
  .map((str) => str.split(""));

function findObstaclePositions(map) {
  const directions = {
    "^": { y: -1, x: 0 },
    ">": { y: 0, x: 1 },
    v: { y: 1, x: 0 },
    "<": { y: 0, x: -1 },
  };

  let positions = 0;
  const path = guardPath(input);
  // return path;
  const findLoop = (visited, map, y, x, dir) => {
    if (!map[y] || !map[y][x]) {
      // guard has left the map
      return 0;
    } else if (visited[dir]?.[`${y},${x}`]) {
      // guard is looping
      return 1;
    } else if (map[y][x] === "#") {
      y -= directions[dir].y;
      x -= directions[dir].x;

      const dirKeys = Object.keys(directions);
      const dirIndex = (dirKeys.indexOf(dir) + 1) % dirKeys.length;
      const newDir = dirKeys[dirIndex];

      return findLoop(
        visited,
        map,
        y + directions[newDir].y,
        x + directions[newDir].x,
        newDir
      );
    } else {
      visited[dir] = { ...visited[dir], [`${y},${x}`]: true };
      return findLoop(
        visited,
        map,
        y + directions[dir].y,
        x + directions[dir].x,
        dir
      );
    }
  };

  const storedLocations = {};
  for (let i = 0; i < path.length - 1; i++) {
    // place obstacle in "front" of guard. temporary
    let { x, y } = path[i + 1];
    if (!storedLocations[`${y},${x}`]) {
      storedLocations[`${y},${x}`] = true;
      map[y][x] = "#";
      positions += findLoop({}, map, path[i].y, path[i].x, path[i].dir);
      map[y][x] = ".";
    }
  }

  return positions;
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
  const fullPath = [];

  const travel = (y, x) => {
    if (!map[y] || !map[y][x]) {
      // return 0;
      return;
    } else if (map[y][x] === "#") {
      y -= directions[dir].y;
      x -= directions[dir].x;

      const dirKeys = Object.keys(directions);
      dirIndex = (dirIndex + 1) % dirKeys.length;
      dir = dirKeys[dirIndex];
      return travel(y + directions[dir].y, x + directions[dir].x);
    } else {
      fullPath.push({ y, x, dir, tile: map[y][x] });
      return travel(y + directions[dir].y, x + directions[dir].x);
    }
  };

  travel(currPos.y, currPos.x);
  return fullPath;
}

console.log(findObstaclePositions(input));
