// src/Grid.js
import React, { useState } from 'react';
import './Grid.css';

function Grid({ n }) {

    const initialGridState = Array.from({ length: n }, () => Array(n).fill(-1));
    const [gridState, setGridState] = useState(initialGridState);

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


    const toggleCell = (rowIndex, colIndex) => {

        const newGridState = gridState.map(row => [...row]);
        newGridState[rowIndex][colIndex] = gridState[rowIndex][colIndex] === -1 ? 1 : -1;
        setGridState(newGridState);
    };


    const resetGrid = () => {
        const newState = Array.from({ length: n }, () => Array(n).fill(-1)); // Example: Turn all cells off
        setGridState(newState);
    };

    const halfResetGrid = () => {
        
        const newState = Array.from({ length: n }, (_, rowIndex) =>
          Array.from({ length: n }, (_, colIndex) =>
            colIndex < n / 2 ? 1 : -1
          )
        );
        setGridState(newState);
      };


    return (
        <div className="grid">
            {createGrid()}
            <button onClick={resetGrid}>Reset Grid</button>
            <button onClick={halfResetGrid}>Half Reset Grid</button>
        </div>
    );
}

export default Grid;
