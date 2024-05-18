// src/Grid.js
import React, { useState } from 'react';
import './Grid.css';

function Grid({ n }) {
  // Initialize the grid state with all cells turned off (0)
  const initialGridState = Array.from({ length: n }, () => Array(n).fill(0));
  const [gridState, setGridState] = useState(initialGridState);

  // Function to update the entire grid state at once
  const updateGrid = (newGridState) => {
    setGridState(newGridState);
  };

  // Function to create the grid with cells that can be toggled
  const createGrid = () => {
    return gridState.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${cell === 1 ? 'on' : 'off'}`}
            onClick={() => toggleCell(rowIndex, colIndex)}
          ></div>
        ))}
      </div>
    ));
  };

  // Toggle the cell state between 0 and 1
  const toggleCell = (rowIndex, colIndex) => {
    // Create a copy of the current grid state
    const newGridState = gridState.map(row => [...row]);

    // Toggle the specific cell
    newGridState[rowIndex][colIndex] = gridState[rowIndex][colIndex] === 0 ? 1 : 0;

    // Set the new grid state
    setGridState(newGridState);
  };

  // Example usage: update the grid state when a button is clicked
  const handleButtonClick = () => {
    const newState = Array.from({ length: n }, () => Array(n).fill(1)); // Example: Turn all cells on
    updateGrid(newState);
  };

  return (
    <div className="grid">
      {createGrid()}
      <button onClick={handleButtonClick}>Update Grid</button>
    </div>
  );
}

export default Grid;
