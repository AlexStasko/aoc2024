import { readFileSync } from "fs";
import path from "path";

const XMAS = 'XMAS';
let arr: string[][];

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

function getRight(i: number, j: number): string {
  return arr[i][j] + arr[i][j + 1] + arr[i][j + 2] + arr[i][j + 3];
}

function getLeft(i: number, j: number): string {
  return arr[i][j] + arr[i][j - 1] + arr[i][j - 2] + arr[i][j - 3];
}

function getDown(i: number, j: number): string {
  return arr[i][j] + arr[i + 1][j] + arr[i + 2][j] + arr[i + 3][j];
}

function getUp(i: number, j: number): string {
  return arr[i][j] + arr[i - 1][j] + arr[i - 2][j] + arr[i - 3][j];
}

function getRightDown(i: number, j: number): string {
  return arr[i][j] + arr[i + 1][j + 1] + arr[i + 2][j + 2] + arr[i + 3][j + 3];
}

function getLeftDown(i: number, j: number): string {
  return arr[i][j] + arr[i + 1][j - 1] + arr[i + 2][j - 2] + arr[i + 3][j - 3];
}

function getRightUp(i: number, j: number): string {
  return arr[i][j] + arr[i - 1][j + 1] + arr[i - 2][j + 2] + arr[i - 3][j + 3];
}

function getLeftUp(i: number, j: number): string {
  return arr[i][j] + arr[i - 1][j - 1] + arr[i - 2][j - 2] + arr[i - 3][j - 3];
}

function isEqual(s: string): boolean {
  return s === XMAS;
}

export function compute(lines: string[]): number {
  let result = 0;

  arr = lines.map(line => line.split(''));

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (j + 3 < arr.length && (isEqual(getRight(i, j)))) result++;
      if (j - 3 >= 0 && (isEqual(getLeft(i, j)))) result++;
      if (i + 3 < arr.length && (isEqual(getDown(i, j)))) result++;
      if (i - 3 >= 0 && (isEqual(getUp(i, j)))) result++;
      if (i + 3 < arr.length && j + 3 < arr.length && (isEqual(getRightDown(i, j)))) result++;
      if (i - 3 >= 0 && j + 3 < arr.length && (isEqual(getRightUp(i, j)))) result++;
      if (i + 3 < arr.length && j - 3 < arr.length && (isEqual(getLeftDown(i, j)))) result++;
      if (i - 3 >= 0 && j - 3 < arr.length && (isEqual(getLeftUp(i, j)))) result++;
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

export const EXPECT = 18;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
