import { readFileSync } from "fs";
import path from "path";

export function readFile(): string[] {
  return readFileSync(path.join(__dirname, 'input.txt')).toString().trimEnd().split('\n');
}

export function compute(lines: string[]): number {
  const order = new Map<number, number[]>();

  const numbs: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].indexOf('|') > 0) {
      const [first, second] = lines[i].split('|').map(Number);
      if (order.has(first)) {
        order.get(first)?.push(second);
      } else {
        order.set(first, [second]);
      }
    } else if (lines[i].indexOf(',') > 0) {
      const pages = lines[i].split(',').map(Number);
      let correct = true;
      for (let j = 0; j < pages.length; j++) {
        for (let k = j + 1; k < pages.length; k++) {
          if (order.get(pages[k])?.includes(pages[j])) {
            correct = false;
            break;
          }
        }
        if (!correct) break;
      }
      if (correct) {
        console.log(pages, '=>', pages.length);
        numbs.push(pages[Math.floor(pages.length / 2)]);
      }
    }
  };

  return numbs.reduce((a, b) => a + b);
}

export const INPUT = `\
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

export const EXPECT = 143;

test('test', () => {
  expect(compute(INPUT.trimEnd().split('\n'))).toEqual(EXPECT);
});

test('task', () => {
  console.log('result: ', compute(readFile()));
});
