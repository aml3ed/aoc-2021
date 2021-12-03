import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const inputPath = path.join(__dirname, "..", "data", "day3.txt");

export const puzzle5 = async (): Promise<number> => {
  const reader = readline.createInterface({
    input: fs.createReadStream(inputPath)
  });
  const bitCounter = [];
  const gamma = [];
  const epsilon = [];
  for await (const line of reader) {
    const lineBits = line.split("");
    lineBits.forEach((bit, index) => {
      const bitNum = parseInt(bit);
      const bitCount = bitCounter[index] || { one: 0, zero: 0 };
      if (bitNum) {
        bitCount.one += 1;
      } else {
        bitCount.zero += 1;
      }
      bitCounter[index] = bitCount;
    });
  }
  bitCounter.forEach((bitCount, index) => {
    if (bitCount.one > bitCount.zero) {
      gamma[index] = 1;
      epsilon[index] = 0;
    } else {
      gamma[index] = 0;
      epsilon[index] = 1;
    }
  });
  const gammaDecimal = parseInt(gamma.join(""), 2);
  const epsilonDecimal = parseInt(epsilon.join(""), 2);
  return gammaDecimal * epsilonDecimal;
};

export const puzzle6 = async (): Promise<number> => {
  const reader = readline.createInterface({
    input: fs.createReadStream(inputPath)
  });
  //   Convert report .txt to linked list
  const report = [];
  for await (const line of reader) {
    const lineArray = line.split("");
    const bitArray = [];
    lineArray.forEach((el) => {
      bitArray.push(parseInt(el));
    });
    report.push(bitArray);
  }
  let bit = 0;
  const findRate = (indexes: Array<number>, leastCommon = false): number => {
    if (indexes.length <= 1) return indexes[0];
    const ones = [];
    const zeros = [];
    indexes.forEach((index) => {
      const currBit = report[index][bit];
      if (currBit) {
        ones.push(index);
      } else {
        zeros.push(index);
      }
    });
    bit += 1;
    if (ones.length > zeros.length) {
      // One is most common
      if (leastCommon) {
        // Remove 1s and rerun
        return findRate(indexes.filter((x) => !ones.includes(x)));
      } else {
        // Remove 0s
        return findRate(indexes.filter((x) => !zeros.includes(x)));
      }
    } else if (ones.length === zeros.length) {
      // Tie game
      if (leastCommon) {
        // Remove 1s and rerun
        return findRate(indexes.filter((x) => !ones.includes(x)));
      } else {
        // Remove 0s
        return findRate(indexes.filter((x) => !ones.includes(x)));
      }
    } else {
      // Zero is most common
      if (leastCommon) {
        // Remove 0s
        return findRate(indexes.filter((x) => !zeros.includes(x)));
      } else {
        // Remove 1s
        return findRate(indexes.filter((x) => !ones.includes(x)));
      }
    }
  };
  // Find gamma rate
  const oxygenRateIndex = findRate(Array.from(Array(report.length).keys()));
  bit = 0;
  const co2RateIndex = findRate(Array.from(Array(report.length).keys()), true);
  console.log(oxygenRateIndex, co2RateIndex);
  const oxygenRate = parseInt(report[oxygenRateIndex].join(""), 2);

  const co2Rate = parseInt(report[co2RateIndex].join(""), 2);
  console.log(oxygenRate, co2Rate);
  return oxygenRate * co2Rate;
};
