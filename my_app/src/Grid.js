// src/Grid.js
import React from 'react';
import './Grid.css';

function Grid({ n }) {
  const createGrid = () => {
    let grid = [];
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        row.push(<div key={`${i}-${j}`} className="cell"></div>);
      }
      grid.push(
        <div key={i} className="row">
          {row}
        </div>
      );
    }
    return grid;
  };

  return <div className="grid">{createGrid()}</div>;
}

export default Grid;
