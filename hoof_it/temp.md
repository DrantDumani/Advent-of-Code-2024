# Goal

The goal of the day is to find the sum of all of the trailhead's scores.

## Info

- A trailhead is any trail that starts at 0.
- Trailheads can only be traversed in up, down, left, or right positions.
- Trailheads can only be traversed if their path increases by a 'height' of 1 at every step
- A trailhead's score is the number of unique 9 positions it can reach.

## Approach

All trailheads start at 0. So if you a 0 on the map, you can start searching for its score in the four directions.
Start the search at zero, then search the four directions for one. If you find a 1, keep searching for a 2. Then a 3 and so on.

When searching for the next step, you never want to search the direction you just came from. If you went down, don't go back up. And if you went left, don't go right. You also don't want to go in a circle and loop forever. If you go down, left, up, and then right, you're back where you came. Avoid circular searches.

Another thing you have to be careful with is merging paths. If you start from 0 and travel down two different paths that end at the same 9, that's not a score of 2. It's a score of 1.

To avoid this, keep a list of steps you've visited on that specific trail. If you've been to that step before, don't bother searching from it. If you've been to that 9 before on that trail head, don't bother searching from it either

## Steps

- Out input will be traversed like an XY map. So split the string by new lines.
- Loop through the map, looking for 0s.
- When you find a zero, start a search from there in the four directions
- If the number has been encountered before, doesn't exist (it's off the map), and is not the next step, then terminate the search
- If you find the number 9 and it hasn't been encountered already, add to the score.
