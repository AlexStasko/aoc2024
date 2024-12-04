import { readFileSync } from "fs";
import path from "path";

const XMAS = 'MAS';
let arr: string[][];

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}


function getFirst(i: number, j: number): string {
  return arr[i - 1][j - 1] + arr[i][j] + arr[i + 1][j + 1];
}

function getSecond(i: number, j: number): string {
  return arr[i + 1][j - 1] + arr[i][j] + arr[i - 1][j + 1];
}


function isEqual(s: string): boolean {
  return s === XMAS;
}

function reverse(s: string): string {
  return s.split('').reverse().join('');
}

export function compute(lines: string[]): number {
  let result = 0;

  arr = lines.map(line => line.split(''));

  for (let i = 1; i < arr.length - 1; i++) {
    for (let j = 1; j < arr[i].length - 1; j++) {
      const first = getFirst(i, j);
      const second = getSecond(i, j);
      if ((isEqual(first) && isEqual(second)) ||
        (isEqual(first) && isEqual(reverse(second))) ||
        (isEqual(reverse(first)) && isEqual(second)) ||
        (isEqual(reverse(first)) && isEqual(reverse(second)))) {
        result++;
      }
    }
  }

  return result;
}

export const INPUT = `\
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

export const EXPECT = 9;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
