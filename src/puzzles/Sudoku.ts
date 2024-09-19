// /src/puzzles/Sudoku.ts

import { Puzzle } from "./Puzzle";
import { SUDOKU_GRID_SIZE, SUB_SUDOKU_GRID_SIZE } from "./../config";

export class Sudoku extends Puzzle {
  public grid: number[][];
  private readonly gridSize: number = SUDOKU_GRID_SIZE;
  private readonly subGridSize: number = SUB_SUDOKU_GRID_SIZE;

  constructor(grid: number[][]) {
    super();
    this.grid = grid;
  }

  // Helper function to check if placing num in grid[row][col] is valid
  public isValid(row: number, col: number, num: number): boolean {
    // Check if num exists in the row
    for (let i = 0; i < this.gridSize; i++) {
      if (this.grid[row][i] === num) return false;
    }

    // Check if num exists in the column
    for (let i = 0; i < this.gridSize; i++) {
      if (this.grid[i][col] === num) return false;
    }

    // Check if num exists in the 3x3 sub-grid
    const startRow = Math.floor(row / this.subGridSize) * this.subGridSize;
    const startCol = Math.floor(col / this.subGridSize) * this.subGridSize;
    for (let i = 0; i < this.subGridSize; i++) {
      for (let j = 0; j < this.subGridSize; j++) {
        if (this.grid[startRow + i][startCol + j] === num) return false;
      }
    }

    return true;
  }

  // Backtracking algorithm to solve the Sudoku
  private solveSudoku(): boolean {
    // Iterate through the entire grid to find an empty cell
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        // Find an empty spot (represented by 0)
        if (this.grid[row][col] === 0) {
          // Try placing numbers 1 to 9 in the empty spot (not 0 to 9)
          for (let num = 1; num <= 9; num++) {
            if (this.isValid(row, col, num)) {
              this.grid[row][col] = num; // Place the number

              // Recursively solve the rest of the grid
              if (this.solveSudoku()) {
                return true;
              }

              // If placing num didn't lead to a solution, backtrack
              this.grid[row][col] = 0; // Reset the cell
            }
          }
          return false; // No valid number found, backtrack
        }
      }
    }
    return true; // Puzzle solved
  }

  // Solve method that calls the backtracking algorithm
  solve(): void {
    if (this.solveSudoku()) {
      console.log("Sudoku solved successfully!");
    } else {
      console.log("Unable to solve Sudoku.");
    }
  }

  // Validate if the Sudoku grid is valid
  validate(): boolean {
    console.log("Validating Sudoku...");
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        const num = this.grid[row][col];
        if (num !== 0) {
          // Temporarily empty the current cell to validate its placement
          this.grid[row][col] = 0;
          if (!this.isValid(row, col, num)) {
            this.grid[row][col] = num; // Restore the number
            return false; // Invalid placement found
          }
          this.grid[row][col] = num; // Restore the number
        }
      }
    }
    return true; // Grid is valid
  }

  // Utility function to print the grid
  printGrid(): void {
    this.grid.forEach((row) => console.log(row.join(" ")));
  }
}
