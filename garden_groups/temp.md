# Goal

The goal is to find the total price of of all fencing regions of the map. The price of a single region is the region's perimeter times its area. Find the price of each region and sum it up.

## Info

- A region is defined by all of the plants that are adjacent to each other (vertically or horizontally) Eg.

`AAAA` is a region

```text
B
B
B
B
```

is also a region

```text
CC
  CC
```

is a region too.

- The area of a region is simply the amount of plants it has. The perimeter is weirder. The perimeter is the number of edges that don't touch plants in the same region. Consider:

`AAAA`

This has a perimeter of 10.

## Approach

At first glance, it looks like I can loop through the garden like a 2d array. If I encounter a plant, I try to find all of the plants in the region. If I encounter another plant of the same variety, I increase the area, but if I encounter a different plant, then a fence should be there and I can increase the perimeter.

Perimeters should be encountered if I go off the map as well.

## Steps

- Convert the input into a 2D array
- You'll be exploring in four directions, so create a map to store tiles you've already visited.
- Create a variable to hold the total price
- Loop through the garden
- If you encounter a plant, start looking for more plants like it in all four directions. We'll use recursion for this.
- The base case will be if you find a different plant (or leave the garden). In that case, increment the area and don't recur any further
- If you find the same kind of plant, recur and keep looking.

## Part 2

Instead of counting the perimeter, we now have to count the sides.
