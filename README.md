# Hanoi Tower Puzzle

A JavaScript solution for Hanoi tower puzzle.

How to Run
----------

Install latest [NodeJS](https://nodejs.org) platform and run the script with following:

```bash
node index.js
```

Methods and Features 
--------------------

+ Configurable number of rods.
+ Deep First Search (DFS).
+ Breadth First Search (BFS).
+ Iterative deepening depth-first search.
+ ...to be done!

Find more comments inside the [code](src/index.js).

Sample Output
-------------

```
--- Hanoi Tower Solution ---
Tower height: 3
Number of rods: 4
Solving (DFS algorithm), please wait...
Done, number of iterations: 16.
One possible solution found (17 steps): ABC--- => AB-C-- => A-C-B- => -C-B-A => C--B-A => --BC-A 
=> --B-AC => B---AC => -B--AC => C-B--A => -BC--A => -B-C-A => B--C-A => --C-AB => C---AB 
=> -C--AB => ---ABC
Solving (BFS algorithm), please wait...
Done, number of iterations: 27.
First possible solution found (6 steps): ABC--- => AB-C-- => A-C-B- => -C-B-A => -C--AB => ---ABC
```