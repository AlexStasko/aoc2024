set dotenv-load := true
set dotenv-required := true

create num:
  @mkdir day{{num}} && cp day00/task1.ts day{{num}}/
  @just next {{num}}

input num:
  @curl --silent --cookie "session=$AUTH" https://adventofcode.com/$YEAR/day/{{num}}/input -o day{{num}}/input.txt

submit num task answer:
  @curl --silent --cookie "session=$AUTH" -X POST https://adventofcode.com/$YEAR/day/{{num}}/answer -d "level={{task}}&answer={{answer}}"
  #| grep "That's not the right answer|That\'s the right answer!"

[no-cd]
next:
  @cp task1.ts task2.ts

test num task:
  @npm test -d day{{num}} -f task{{task}}.ts
