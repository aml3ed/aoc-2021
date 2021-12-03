import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const inputPath = path.join(__dirname, "..", "data", "day1.txt");

export const puzzle1 = async (): Promise<number> => {
  const reader = readline.createInterface({
    input: fs.createReadStream(inputPath)
  });
  let prev = null;
  let curr = null;
  let count = 0;
  for await (const line of reader) {
    curr = parseInt(line);
    if (prev && prev < curr) {
      count++;
      // console.log(count);
    }
    prev = curr;
  }
  return count;
};

export const puzzle2 = async (): Promise<number> => {
  const reader = readline.createInterface({
    input: fs.createReadStream(inputPath)
  });
  const data = [];
  for await (const line of reader) {
    const number = parseInt(line);
    data.push(number);
  }

  let cursor = 0;
  let compare = 3;
  let count = 0;

  for (cursor; cursor < data.length - 2; cursor++) {
    if (data[cursor] < data[compare]) count++;
    compare++;
  }
  return count;
};
