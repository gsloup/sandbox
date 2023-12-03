/*
https://adventofcode.com/2023/day/2

Day 2, Part 1: 

As you walk, the Elf shows you a small bag and some cubes which are either red, green, or blue. Each time you play this game, he will hide a secret number of cubes of each color in the bag, and your goal is to figure out information about the number of cubes.

To get information, once a bag has been loaded with cubes, the Elf will reach into the bag, grab a handful of random cubes, show them to you, and then put them back in the bag. He'll do this a few times per game.

You play several games and record the information from each game (your puzzle input). Each game is listed with its ID number (like the 11 in Game 11: ...) followed by a semicolon-separated list of subsets of cubes that were revealed from the bag (like 3 red, 5 green, 4 blue).

For example, the record of a few games might look like this:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

In game 1, three sets of cubes are revealed from the bag (and then put back again). The first set is 3 blue cubes and 4 red cubes; the second set is 1 red cube, 2 green cubes, and 6 blue cubes; the third set is only 2 green cubes.

The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?

In the example above, games 1, 2, and 5 would have been possible if the bag had been loaded with that configuration. However, game 3 would have been impossible because at one point the Elf showed you 20 red cubes at once; similarly, game 4 would also have been impossible because the Elf showed you 15 blue cubes at once. If you add up the IDs of the games that would have been possible, you get 8.

Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?
*/

// const fs = require("fs");
// let input = fs
//   .readFileSync("html-sandbox/advent-of-code-2023/day2/input.txt")
//   .toString();

let line = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
let gameNumSum = 0; // sum of all the valid game numbers

// These are the actual values of the cubes in the elf's bag
const bagValues = {
  red: 12,
  green: 13,
  blue: 14,
};

// Check each game
// for (let line of input.split("/n")) {
[gameNum, highestValues] = setHighestGameVals(line); // [ 1, { blue: 6, red: 4, green: 2 } ]
const isInvalidGame = Object.keys(highestValues).some((color) => {
  console.log("Color:", color);
  console.log("   Game value:", highestValues[color]);
  console.log("   Actual value", bagValues[color]);
  console.log(" ");
  return highestValues[color] > bagValues[color];
});

console.log(isInvalidGame, "isInvalidGame");

/*
Takes each "line" or game's string data and processes it.

Will return an array with index 0 being the game number
    and index 1 being an object with all the colors and highest values

    ex) [ 1, { blue: '6', red: 4, green: 2 } ]
*/
function setHighestGameVals(line) {
  const [game, ...gameData] = line.split(/[:,;]/);
  const gameNum = parseInt(game.slice(-1));

  let highestValues = {};

  for (let value of gameData) {
    [number, color] = value.trim().split(" ");

    if (color in highestValues) {
      if (number > highestValues[color]) {
        highestValues[color] = parseInt(number);
      }
    } else {
      highestValues[color] = parseInt(number); // blue : 1
    }
  }
  console.log([gameNum, highestValues]);
  return [gameNum, highestValues];
}