import React, { useState } from "react";
import { generateRandomSudoku } from "./utils/RandomSudokuGenerator";
import { Sudoku } from "./puzzles/Sudoku";

function App() {
  const [grid, setGrid] = useState(generateRandomSudoku("medium")); // Default to medium difficulty
  const [message, setMessage] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  ); // Default to 'medium'
  const [cellStatus, setCellStatus] = useState<
    { row: number; col: number; status: "valid" | "invalid" | "" }[]
  >([]); // Track cell validation status

  // Handle solving the puzzle using the program
  const handleSolve = () => {
    const sudoku = new Sudoku(grid);

    if (sudoku.validate()) {
      sudoku.solve();
      setGrid([...sudoku.grid]); // Update the grid with the solved puzzle
      setMessage("Sudoku solved successfully!");
    } else {
      setMessage("The Sudoku grid is invalid.");
    }
  };

  // Handle generating a new puzzle based on selected difficulty
  const handleNewPuzzle = (selectedDifficulty: "easy" | "medium" | "hard") => {
    const newGrid = generateRandomSudoku(selectedDifficulty); // Generate the new grid based on difficulty
    setGrid(newGrid); // Set the new grid
    setMessage(""); // Clear the message
    setCellStatus([]); // Reset cell statuses
  };

  // Handle user input when they enter numbers into the grid
  const handleInputChange = (row: number, col: number, value: string) => {
    const newGrid = [...grid]; // Create a copy of the grid
    const parsedValue = parseInt(value);
    const sudoku = new Sudoku(newGrid);

    // Allow only numbers between 1-9 or an empty string (to reset a cell)
    if (parsedValue >= 1 && parsedValue <= 9) {
      newGrid[row][col] = parsedValue;

      // Check if the input is valid immediately
      if (sudoku.isValid(row, col, parsedValue)) {
        setCellStatus([{ row, col, status: "valid" }]);
      } else {
        setCellStatus([{ row, col, status: "invalid" }]);
      }
    } else if (value === "") {
      newGrid[row][col] = 0; // Empty the cell if input is cleared
      setCellStatus([{ row, col, status: "" }]); // Clear the status
    }

    setGrid(newGrid); // Update the grid state
  };

  // Handle difficulty selection
  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDifficulty = event.target.value as "easy" | "medium" | "hard";
    setDifficulty(selectedDifficulty); // Update the selected difficulty
  };

  // Helper function to get the cell's validation status
  const getCellStatus = (row: number, col: number) => {
    const cell = cellStatus.find((c) => c.row === row && c.col === col);
    return cell ? cell.status : ""; // Return 'valid', 'invalid', or ''
  };

  return (
    <div className="App">
      <h1>Sudoku Solver</h1>

      {/* Difficulty Selection */}
      <label htmlFor="difficulty">Select Difficulty: </label>
      <select
        id="difficulty"
        value={difficulty}
        onChange={handleDifficultyChange}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      {/* Render Sudoku grid as input fields */}
      <table>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  {/* If the cell is originally empty (0), allow input, otherwise show the number as readonly */}
                  <input
                    type="text"
                    value={
                      grid[rowIndex][colIndex] === 0
                        ? ""
                        : grid[rowIndex][colIndex]
                    }
                    onChange={(e) =>
                      handleInputChange(rowIndex, colIndex, e.target.value)
                    }
                    maxLength={1} // Limit input to 1 character
                    style={{
                      width: "20px",
                      textAlign: "center",
                      border:
                        getCellStatus(rowIndex, colIndex) === "invalid"
                          ? "2px solid red"
                          : getCellStatus(rowIndex, colIndex) === "valid"
                          ? "2px solid green"
                          : "1px solid black",
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleSolve}>Solve Automatically</button>
      <button onClick={() => handleNewPuzzle(difficulty)}>New Puzzle</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
