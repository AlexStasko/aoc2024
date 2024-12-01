import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

export function compute(lines: string[]): number {

  let result = 0;
  const left: number[] = [];
  const right: number[] = [];

  lines.forEach(line => {
    const pair = line.split('   ');
    left.push(+pair[0]);
    right.push(+pair[1]);
  });

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  for (let i = 0; i < left.length; i++) {
    const tmp = Math.abs(left[i] - right[i]);
    result += tmp;
  }

  return result;
}

export const INPUT = `\
3   4
4   3
2   5
1   3
3   9
3   3
`;

export const EXPECT = 11;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
