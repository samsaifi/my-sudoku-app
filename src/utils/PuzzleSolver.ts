import { Puzzle } from "../puzzles/Puzzle";

export class PuzzleSolver<T extends Puzzle> {
  constructor(private puzzle: T) {}
  async solve(): Promise<void> {
    if (!this.puzzle.validate()) {
      throw new Error("Puzzle Is invalid");
    }
    console.log("Starting to solve the puzzle...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.puzzle.solve();
  }
}
