import * as path from "path";
import { puzzle1, puzzle2 } from "./day1";
import { puzzle3, puzzle4 } from "./day2";
import { puzzle5, puzzle6 } from "./day3";

const day3Input = path.join(__dirname, "..", "data", "day3.txt");

async function main() {
  console.log("--------- Puzzle 1 ---------");
  console.log(await puzzle1());

  console.log("--------- Puzzle 2 ---------");
  console.log(await puzzle2());

  console.log("--------- Puzzle 3 ---------");
  console.log(await puzzle3());

  console.log("--------- Puzzle 4 ---------");
  console.log(await puzzle4());

  console.log("--------- Puzzle 5 ---------");
  console.log(await puzzle5(day3Input));

  console.log("--------- Puzzle 6 ---------");
  console.log(await puzzle6(day3Input));
}
main();
