import * as path from "path";
import { puzzle6 } from "../src/day3";

const day3TestInput = path.join(__dirname, "..", "data", "day3.test.txt");

describe("day 3 tests", () => {
  it("should calculate puzzle6 correctly", async () => {
    expect(await puzzle6(day3TestInput)).toBe(230);
  });
});
