const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");
const [rulesInput, pageInput] = input.split("\n\n");

const rules = rulesInput.split("\n");
const pages = pageInput.split("\n");

function findCorrectOrder(rules, pageBatch) {
  let totalCorrected = 0;
  const invalidRules = {};

  for (let rule of rules) {
    const invRule = rule.replace(/(\d+)\|(\d+)/, "$2|$1");
    invalidRules[invRule] = true;
  }

  for (let i = 0; i < pageBatch.length; i++) {
    const pages = pageBatch[i].split(",");
    let preSorted = true;
    let j = 0;
    let didSort = false;
    while (j < pages.length - 1) {
      if (invalidRules[`${pages[j]}|${pages[j + 1]}`]) {
        preSorted = false;
        const temp = pages[j];

        pages[j] = pages[j + 1];
        pages[j + 1] = temp;
        didSort = true;
      }

      if (j === pages.length - 2 && didSort) {
        didSort = false;
        j = 0;
      } else {
        j += 1;
      }
    }

    if (!preSorted) {
      totalCorrected += Number(pages[Math.floor(pages.length / 2)]);
    }
  }
  return totalCorrected;
}

console.log(findCorrectOrder(rules, pages));
