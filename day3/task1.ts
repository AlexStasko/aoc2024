import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

export function compute(lines: string[]): number {
  let result = 0;

  const reg = lines.flatMap(line => [
    ...line.matchAll(/mul\(\d{1,3},\d{1,3}\)/g)
  ])

  const pairs = reg.map(str => str[0].slice(4, -1).split(','));
  result = pairs
    .reduce((a, b) => { return a + (Number(b[0]) * Number(b[1])) }, result);

  return result;
}

export const INPUT = `\
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
`;

export const EXPECT = 161;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
