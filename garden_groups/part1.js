const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n");

function findPrice(garden) {
  const explored = {};
  let totalPrice = 0;

  const getRegion = (plant, y, x, dims = { a: 0, p: 0 }) => {
    // you've already seen this plant in this region
    if (explored[`${y},${x}`] && garden[y]?.[x] === plant) {
      return dims;
    } else if (!garden[y] || garden[y][x] !== plant) {
      // you've reached a fence
      dims.a += 1;
      return dims;
    } else {
      // explore this tile and try to explore neighboring plants
      explored[`${y},${x}`] = true;
      dims.p += 1;
      getRegion(plant, y + 1, x, dims);
      getRegion(plant, y - 1, x, dims);
      getRegion(plant, y, x + 1, dims);
      getRegion(plant, y, x - 1, dims);
      return dims;
    }
  };

  for (let y = 0; y < garden.length; y++) {
    for (let x = 0; x < garden[y].length; x++) {
      if (!explored[`${y},${x}`]) {
        const { p, a } = getRegion(garden[y][x], y, x);
        totalPrice = totalPrice + p * a;
        console.log(p);
      }
    }
  }
  return totalPrice;
}

console.log(findPrice(input));
