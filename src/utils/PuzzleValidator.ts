import { Grid } from "../types";

export class PuzzleValidator {
  static validateGrid(grid: Grid, expectedSize: number): boolean {
    return (
      grid.length === expectedSize &&
      grid.every((row) => row.length === expectedSize)
    );
  }
}
