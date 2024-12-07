const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");
const [rulesInput, pageInput] = input.split("\n\n");

const rules = rulesInput.split("\n");
const pages = pageInput.split("\n");

function findCorrectOrder(rules, pageBatch) {
  let totalValid = 0;
  const invalidRules = {};

  for (let rule of rules) {
    const invRule = rule.replace(/(\d+)\|(\d+)/, "$2|$1");
    invalidRules[invRule] = true;
  }

  for (let i = 0; i < pageBatch.length; i++) {
    const pages = pageBatch[i].split(",");
    let isValid = true;
    for (let j = 0; j < pages.length; j++) {
      for (let k = j + 1; k < pages.length; k++) {
        if (invalidRules[`${pages[j]}|${pages[k]}`]) {
          isValid = false;
        }
      }
    }
    if (isValid) {
      totalValid += Number(pages[Math.floor(pages.length / 2)]);
    }
  }
  return totalValid;
}

console.log(findCorrectOrder(rules, pages));
