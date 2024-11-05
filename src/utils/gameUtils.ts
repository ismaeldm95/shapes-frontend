// src/utils/gameUtils.ts

export function generateShapeOptions(compoundShape: number[], seed: string): number[] {
    // Convert seed to BigInt, regardless of input type
    let seedBigInt: bigint = BigInt(seed);
  
    let randomState = seedBigInt;
    const random = () => {
      randomState = (randomState * 1103515245n + 12345n) & 0x7fffffffn;
      return Number(randomState) / 2147483647;
    };
  
    // Create an array of all numbers from 1 to 40, excluding those in compoundShape
    const remainingNumbers = Array.from({ length: 40 }, (_, i) => i + 1)
      .filter(num => !compoundShape.includes(num));
  
    // Start with all elements from compoundShape
    const result = [...compoundShape];
  
    // Add random elements from remainingNumbers until we have 9 total
    while (result.length < 9) {
      const randomIndex = Math.floor(random() * remainingNumbers.length);
      result.push(remainingNumbers[randomIndex]);
      remainingNumbers.splice(randomIndex, 1);
    }
  
    // Shuffle the final array
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

  
    return result;
  }