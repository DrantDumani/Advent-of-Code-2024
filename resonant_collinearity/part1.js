const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split(/\n/);

function findAntinodes(grid) {
  let numOfNodes = 0;

  // prevent duplicate nodes from being found
  const antiNodeCoords = {};

  // reduce the number of loops through the grid
  const antennaeCoords = {};

  const findAntinode = (y2, x2, y1, x1) => {
    const distY = y2 - y1;
    const distX = x2 - x1;

    const node1 = [y2 + distY, x2 + distX];
    const node2 = [y1 - distY, x1 - distX];

    if (validateNodeLoc(node1)) {
      antiNodeCoords[`${node1[0]},${node1[1]}`] = true;
      numOfNodes += 1;
    }

    if (validateNodeLoc(node2)) {
      antiNodeCoords[`${node2[0]},${node2[1]}`] = true;
      numOfNodes += 1;
    }
  };

  const findFrequency = (frequency, grid, startY, startX) => {
    let y = startY;
    let x = startX + 1;
    let aIndex = 0;

    while (y < grid.length) {
      while (x < grid[y].length) {
        if (grid[y][x] === frequency) {
          antennaeCoords[frequency][`${y},${x}`] = aIndex;
          aIndex += 1;

          antennaeCoords[frequency].arr.push([y, x]);

          findAntinode(y, x, startY, startX);
        }
        x += 1;
      }
      y += 1;
      x = 0;
    }
  };

  const validateNodeLoc = (node) => {
    const [y, x] = node;
    if (!grid[y] || !grid[y][x] || antiNodeCoords[`${y},${x}`]) {
      return false;
    } else return true;
  };

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      let frequency = "";
      if (grid[y][x] !== ".") {
        frequency = grid[y][x];

        // if current frequency hasn't been found, then find the rest
        if (!antennaeCoords[frequency]) {
          antennaeCoords[frequency] = { arr: [] };
          findFrequency(frequency, grid, y, x);
        } else {
          // look through all of the frequencies of that type that you haven't found all pairs for
          const foundIndex = antennaeCoords[frequency][`${y},${x}`];
          const freqArr = antennaeCoords[frequency].arr;

          for (let f = foundIndex + 1; f < freqArr.length; f++) {
            const [y2, x2] = freqArr[f];
            findAntinode(y2, x2, y, x);
          }
        }
      }
    }
  }

  return numOfNodes;
}

console.log(findAntinodes(input));
