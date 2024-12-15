const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");

function defrag(str) {
  const fileArr = [];
  const freeStore = {};
  let checkSum = 0;

  let fileIndex = 0;
  let isFile = true;

  // store free spaces that cannot be filled when found
  const storeFreeLoc = (list, freeStart, size) => {
    if (!list.head) {
      list.head = { start: freeStart, size, next: null };
      list.tail = list.head;
    } else {
      list.tail.next = { start: freeStart, size, next: null };
      list.tail = list.tail.next;
    }
  };

  const searchStore = (list, fileSize) => {
    // search for a free space that can accomodate the file
    let current = list.head;
    let prev = null;
    while (current && current.size < fileSize) {
      prev = current;
      current = current.next;
    }

    // if no freespace has been found, return null
    if (!current) {
      return null;
    }

    const freeStart = current.start;
    // if free space is bigger than fileSize, update the list item
    if (current.size > fileSize) {
      current.size -= fileSize;
      current.start += fileSize;
    }

    // if free space is equal to file size, delete the list item
    if (current.size === fileSize) {
      if (prev) {
        prev.next = current.next;
      } else {
        // move the list head
        list.head = list.head.next;
      }
    }
    return freeStart;
  };

  for (let c = 0; c < str.length; c++) {
    let segment = "";
    const size = Number(str[c]);

    if (isFile) {
      segment = fileIndex;
      fileIndex += 1;
    } else {
      segment = ".";
    }
    for (let i = 0; i < size; i++) {
      fileArr.push(segment);
    }
    isFile = !isFile;
  }

  let start = 0;
  let end = fileArr.length - 1;
  let lastMoved = Infinity;

  // store free spaces in list
  while (start < fileArr.length) {
    if (fileArr[start] === ".") {
      let size = 1;
      let endFree = start + 1;

      while (fileArr[endFree] === ".") {
        size += 1;
        endFree += 1;
      }
      storeFreeLoc(freeStore, start, size);
      start = endFree;
    } else {
      start += 1;
    }
  }

  while (end > freeStore.head.start) {
    if (fileArr[end] !== ".") {
      const fileId = fileArr[end];
      let size = 1;
      let eof = end - 1;

      while (fileArr[eof] === fileId) {
        size += 1;
        eof -= 1;
      }

      // if you've already moved this file, don't move it again
      if (fileId < lastMoved) {
        lastMoved = fileId;
        const freeStart = searchStore(freeStore, size);

        // if you have a free space to the left, make the swap
        if (freeStart && freeStart < end - size) {
          for (let s = 0; s < size; s++) {
            fileArr[freeStart + s] = fileId;
            fileArr[end - s] = ".";
          }
        }
      }
      end -= size;
    } else {
      end -= 1;
    }
  }

  for (let i = 0; i < fileArr.length; i++) {
    if (fileArr[i] !== ".") {
      checkSum = checkSum + i * fileArr[i];
    }
  }

  return checkSum;
}

console.time("defrag");
console.log(defrag(input));
console.timeEnd("defrag");
