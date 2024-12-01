//  separate into two lists like before
// lists do NOT need to be sorted
// figure out which numbers appear in the first list
// find out how often those numbers appear in the second list
// sum up the numbers multiplied by their apperances. So (n1*m1) + (n2 * m2) + ... (nn * mn)

const fs = require("fs");

const ids = fs
  .readFileSync("./input.txt", "utf8")
  .split(/\D/)
  .map((el) => Number(el));

const idMap = {};

for (let i = 0; i < ids.length; i += 2) {
  idMap[ids[i]] = 0;
}

for (let i = 1; i < ids.length; i += 2) {
  if (Number.isInteger(idMap[ids[i]])) {
    idMap[ids[i]] += 1;
  }
}

let sum = 0;
for (const [key, val] of Object.entries(idMap)) {
  sum += Number(key) * val;
}
console.log(sum);
