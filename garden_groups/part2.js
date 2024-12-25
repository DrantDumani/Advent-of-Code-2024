const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n");

function findPrice(garden) {
  const explored = {};
  let totalPrice = 0;

  const getRegion = (plant, y, x, dims = { a: 0, sides: 0, vertices: {} }) => {
    // you've already seen this plant in this region
    if (explored[`${y},${x}`] && garden[y]?.[x] === plant) {
      return dims;
    } else if (!garden[y] || garden[y][x] !== plant) {
      // you've reached a fence
      return dims;
    } else {
      // explore this tile and try to explore neighboring plants
      explored[`${y},${x}`] = true;
      dims.a += 1;

      // store all points on a vertex. If new vertex, you have a new side
      // vertices may overlap. If they do, store them in a different property
      if (garden[y]?.[x] === plant && garden[y]?.[x + 1] !== plant) {
        if (!dims.vertices[`+x${x}`]) {
          dims.sides += 1;
          dims.vertices[`+x${x}`] = [y];
        } else {
          dims.vertices[`+x${x}`].push(y);
        }
      }

      if (garden[y]?.[x] === plant && garden[y]?.[x - 1] !== plant) {
        if (!dims.vertices[`-x${x}`]) {
          dims.sides += 1;
          dims.vertices[`-x${x}`] = [y];
        } else {
          dims.vertices[`-x${x}`].push(y);
        }
      }

      if (garden[y]?.[x] === plant && garden[y + 1]?.[x] !== plant) {
        if (!dims.vertices[`+y${y}`]) {
          dims.sides += 1;
          dims.vertices[`+y${y}`] = [x];
        } else {
          dims.vertices[`+y${y}`].push(x);
        }
      }

      if (garden[y]?.[x] === plant && garden[y - 1]?.[x] !== plant) {
        if (!dims.vertices[`-y${y}`]) {
          dims.sides += 1;
          dims.vertices[`-y${y}`] = [x];
        } else {
          dims.vertices[`-y${y}`].push(x);
        }
      }

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
        let { a, sides, vertices } = getRegion(garden[y][x], y, x);

        // find 'breaks' in vertices. Breaks create new sides
        for (let key in vertices) {
          vertices[key].sort((a, b) => a - b);
          let vPoint = vertices[key][0];
          for (let i = 1; i < vertices[key].length; i++) {
            if (Math.abs(vPoint - vertices[key][i]) !== 1) {
              sides += 1;
            }
            vPoint = vertices[key][i];
          }
        }

        totalPrice = totalPrice + a * sides;
      }
    }
  }
  return totalPrice;
}

console.log(findPrice(input));
