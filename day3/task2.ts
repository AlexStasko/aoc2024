import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

function mul(str: string): number {
  const pair = str.slice(4, -1).split(',');
  return Number(pair[0]) * Number(pair[1]);
}

export function compute(lines: string[]): number {
  let result = 0;

  const reg = lines.flatMap(line => [
    ...line.matchAll(/(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))/g)
  ]).map(r => r[0]);

  let isDo = true;
  for (let i = 0; i < reg.length; i++) {
    if (reg[i].startsWith('mul')) {
      if (isDo) {
        result += mul(reg[i]);
      }
    } else if (reg[i] === "don't()") {
      isDo = false;
    } else {
      isDo = true;
    }
  }


  return result;
}

export const INPUT = `\
xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
`;

export const EXPECT = 48;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
