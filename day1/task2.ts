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


  for (let i = 0; i < left.length; i++) {
    let num = 0;
    for (let j = 0; j < right.length; j++) {
      if (left[i] == right[j]) num++;
    }
    const tmp = left[i] * num;
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

export const EXPECT = 31;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
