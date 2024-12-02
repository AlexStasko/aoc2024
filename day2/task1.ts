import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

export function compute(lines: string[]): number {
  let result = 0;

  const arr = lines.map(line => line.split(' ').map(entry => Number.parseInt(entry)));


  for (let j = 0; j < arr.length; j++) {
    let safe = false;
    let inc = false;
    for (let i = 0; i < arr[j].length - 1; i++) {
      const diff = arr[j][i] - arr[j][i + 1];
      if (i == 0) {
        if (diff > 0) inc = false;
        if (diff < 0) inc = true;
        if (diff == 0 || ![1, 2, 3].includes(Math.abs(diff))) {
          safe = false;
          break;
        }
      } else {
        if (diff > 0 && !inc && [1, 2, 3].includes(diff)) {
          safe = true;
        } else if (diff < 0 && inc && [1, 2, 3].includes(Math.abs(diff))) {
          safe = true;
        } else {
          safe = false;
          break;
        }
      }
    }
    if (safe) {
      result++;
    }
  };

  return result;
}

export const INPUT = `\
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

export const EXPECT = 2;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
