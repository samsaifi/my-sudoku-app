export interface IPuzzle {
  solve(): void;
  validate(): boolean;
}
export abstract class Puzzle implements IPuzzle {
  abstract solve(): void;
  abstract validate(): boolean;
}
