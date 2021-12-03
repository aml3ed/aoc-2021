import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const inputPath = path.join(__dirname, "..", "data", "day2.txt");

export const puzzle3 = async (): Promise<number> => {
  const reader = readline.createInterface({
    input: fs.createReadStream(inputPath)
  });
  let position = 0;
  let depth = 0;
  for await (const line of reader) {
    const [command, amount] = line.split(" ");
    const number = parseInt(amount);
    switch (command) {
      case "forward":
        position += number;
        break;
      case "down":
        depth += number;
        break;
      case "up":
        if (depth > 0) depth -= number;
        break;
      default:
        break;
    }
  }
  return position * depth;
};

export const puzzle4 = async (): Promise<number> => {
  const reader = readline.createInterface({
    input: fs.createReadStream(inputPath)
  });
  let position = 0;
  let depth = 0;
  let aim = 0;
  for await (const line of reader) {
    const [command, amount] = line.split(" ");
    const number = parseInt(amount);
    switch (command) {
      case "forward":
        position += number;
        depth += number * aim;
        break;
      case "down":
        aim += number;
        break;
      case "up":
        aim -= number;
        break;
      default:
        break;
    }
  }
  return position * depth;
};
