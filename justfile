set dotenv-load := true
set dotenv-required := true

day day:
  @mkdir day{{day}} && cp day00/task1.ts day{{day}}/
  @just input {{day}}

input day:
  @curl --silent --cookie "session=$AUTH" https://adventofcode.com/$YEAR/day/{{day}}/input -o day{{day}}/input.txt

submit day task answer:
  @curl --silent --cookie "session=$AUTH" -X POST https://adventofcode.com/$YEAR/day/{{day}}/answer -d "level={{task}}&answer={{answer}}" | grep "That's the right answer!"

[no-cd]
next:
  @cp task1.ts task2.ts

test day task:
  @npm test -- --testMatch="**/day{{day}}/task{{task}}.ts"
