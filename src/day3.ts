import * as fs from "fs";
import * as readline from "readline";

export const puzzle5 = async (inputPath: string): Promise<number> => {
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

export const puzzle6 = async (inputPath: string): Promise<number> => {
  const reader = readline.createInterface({
    input: fs.createReadStream(inputPath)
  });
  /*
    Read file and create an array (report) of arrays where each
    element is an array of the bits of that line

    [
        [1, 1, 1, 0, 0, 1, 1, 0]
        ...
    ]
  */
  const report = [];
  for await (const line of reader) {
    const lineArray = line.split("");
    const bitArray = [];
    lineArray.forEach((el) => {
      bitArray.push(parseInt(el));
    });
    report.push(bitArray);
  }
  /*
    Global cursor for bit (horizontal) value for looping through
    should probably be a for loop, but I'm lazy
  */
  let bit = 0;
  /*
    Recursive function that finds the rate (oxygen or co2)
    Takes a value of indexes that represents the remaining items in the
    report. Removes all of the 1 bitted or 0 bittes indexes and reruns
    with the remainder until one element is left, the index number in the report
    that represents the rate.
  */
  const findRate = (indexes: Array<number>, leastCommon = false): number => {
    // Base case, only one index left: the rate.
    if (indexes.length <= 1) return indexes[0];

    /*
    Sort the indexes by whether they 
    have a 1 or 0 at the current bit
    */
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
    // Increment bit cursor
    bit += 1;

    /*
     Compare whether there are more 1 bits
     than 0 bits
    */
    if (ones.length >= zeros.length) {
      // One is most common
      return leastCommon
        ? // Keep 0s
          findRate(
            indexes.filter((x) => zeros.includes(x)),
            leastCommon
          )
        : // Keep 1s
          findRate(
            indexes.filter((x) => ones.includes(x)),
            leastCommon
          );
    } else {
      // Zero is most common
      return leastCommon
        ? // Keep 0s
          findRate(
            indexes.filter((x) => ones.includes(x)),
            leastCommon
          )
        : // Keep 1s
          findRate(
            indexes.filter((x) => zeros.includes(x)),
            leastCommon
          );
    }
  };
  // Find the index of the oxygen rate
  const oxygenRateIndex = findRate(Array.from(Array(report.length).keys()));
  // Convert binary oxygen rate to decimal
  const oxygenRate = parseInt(report[oxygenRateIndex].join(""), 2);

  // Find the index of the co2 rate
  bit = 0;
  const co2RateIndex = findRate(Array.from(Array(report.length).keys()), true);
  // Convert binary co2 rate to decimal
  const co2Rate = parseInt(report[co2RateIndex].join(""), 2);

  // Return multiplied oxygen rate by co2 rate
  console.log(oxygenRate, co2Rate);
  return oxygenRate * co2Rate;
};
