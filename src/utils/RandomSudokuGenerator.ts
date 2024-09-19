// /src/utils/RandomSudokuGenerator.ts

import { Sudoku } from "../puzzles/Sudoku";

export function generateRandomSudoku(
  difficulty: "easy" | "medium" | "hard" | "veryhard"
): number[][] {
  // Initialize an empty grid (all 0s)
  const grid: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));

  // Create a valid Sudoku solver to fill the grid
  const sudoku = new Sudoku(grid);
  sudoku.solve(); // This will generate a solved Sudoku grid

  // Determine the number of cells to remove based on difficulty
  let cellsToRemove;
  switch (difficulty) {
    case "easy":
      cellsToRemove = 25; // Remove ~35 cells for easy difficulty
      break;
    case "medium":
      cellsToRemove = 45; // Remove ~45 cells for medium difficulty
      break;
    case "hard":
      cellsToRemove = 55; // Remove ~55 cells for hard difficulty
      break;
    case "veryhard":
      cellsToRemove = 75; // Remove ~75 cells for hard difficulty
      break;
    default:
      cellsToRemove = 45; // Default to medium difficulty
  }

  // Randomly remove cells to create the puzzle
  for (let i = 0; i < cellsToRemove; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    sudoku.grid[row][col] = 0; // Set the cell to 0 (empty)
  }
  console.log(difficulty);

  return sudoku.grid; // Return the randomized initial grid
}
