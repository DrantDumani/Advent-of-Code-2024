// Every number is a number in the list. The first number will always belong to list 1. Second belongs to list 2
// You can reliably alternate. Don't split by line. Split by non number characters
// sort the two arrays from smallest to largest
//  set sum to 0
// loop once through the length of an array, finding the DISTANCE btwn the two
// sum up the distances
const fs = require("fs");

const ids = fs
  .readFileSync("./input.txt", "utf8")
  .split(/\D/)
  .map((el) => Number(el));

const list1 = [];
const list2 = [];

ids.forEach((id, i) => {
  (i + 2) % 2 === 0 ? list1.push(id) : list2.push(id);
});

function findDistanceSum(list1, list2) {
  list1.sort();
  list2.sort();

  let sum = 0;
  for (let i = 0; i < list1.length; i++) {
    sum += Math.abs(list1[i] - list2[i]);
  }
  console.log(sum);
}

findDistanceSum(list1, list2);
