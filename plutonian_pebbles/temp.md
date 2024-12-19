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

## Part 2

The part 1 approach runs out of memory.
Try to use an object that keeps track of the number of number instances.
So instead of making new strings, just count the number of strings. So maybe don't create a linked list. Just use a map

Maybe do two objects? Here me out.
One object holds the count of the specific numbered rock
While the other object just holds the result of that rock so that you don't have to do the computation over again.
If a stone numbered 2 produces X results after Y blinks, another stone numbered 2 will do the same, so there's no reason to calc it.

Store the result of each stone and the number of blinks
Have another object store the number of stones. Might be a little weird due to stones being replaced at times.
Also, what do you loop through? No linked list. Are you going to loop through the object and fetch keys?
I think a DFS is the way to go, man. Loop through the stone and perform a DFS on each number for the number of blinks
If a number is replaced, don't increment the number of stones. If it splits, increment the number by 1.

Try doing the memoization approach. Cache the stone number and number of blinks, saying how many stones you'd have after X blinks.

So here's the plan
Loop through the array of rocks and place any created rocks into the map, storing their number.
No duplicates get sorted at all. Duplicates just add to the amount of rocks for that number.
When the number splits, the new number takes the amount that the previous number had.
