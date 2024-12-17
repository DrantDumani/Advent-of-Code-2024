# Goal

The goal is to find the number of stones that would appear after blinking a certain amount of times.

## Info

- All stones have conditional rules on what happens to them after you blink
  - Stones with the number 0 are replaced by stones with number 1
  - Stones with an even number of digits are replaced by two stones. The left stone takes the left half while the right stone takes the right half. New numbers do not keep leading zeroes.
  - If none of these rules apply, the stone's number is multipled by 2024
  - Stone order is always preserved.

## Approach

Seems like this problem will insert a lot of elements into the middle of the list of rocks. On top of that, you'll be looping through the list of rocks a lot.
One approach would be to loop through the list X amount of times. For each rock, follow the rules as they apply. Replacement rules will just change the current rock, while rules that split the rock will change the current one and insert one to the right (the next rock).

Be careful with mathematical operations, since all of the values are strings. For splitting up numbers, you can just leave them as strings. But for mathematical operations, you gotta convert them

## Steps

- Turn your input into a linked list. With a list, it'll be easier to insert items into the list of rocks.
- Loop through the linked list X amount of times. Each time you do, apply the rule to the list of rocks.
