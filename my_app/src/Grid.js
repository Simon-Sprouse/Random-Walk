// src/Grid.js
import React, { useState, useEffect } from 'react';
import Particle from './Particle';
import { hsvToRgb } from './utils';
import './Grid.css';

function Grid({ n }) {
  const initialGridState = Array.from({ length: n }, () => Array(n).fill({ hue: 0, saturation: 0, value: 0 }));

  const [gridState, setGridState] = useState(initialGridState);
  const [particles, setParticles] = useState([]);
  const [hue, setHue] = useState(Math.random());

  const createGrid = () => {
    return gridState.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => {
          const { hue, saturation, value } = cell;
          const [r, g, b] = hsvToRgb(hue, saturation, value);
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
              onClick={() => addParticleAt(rowIndex, colIndex)}
            ></div>
          );
        })}
      </div>
    ));
  };

  // Function to add a particle at the specified position
  const addParticleAt = (rowIndex, colIndex) => {
    const newParticle = new Particle(rowIndex, colIndex, n, hue);
    setParticles([...particles, newParticle]);
  };

  // Function to add a particle at a random location
  const addParticle = () => {
    const rowIndex = Math.floor(Math.random() * n);
    const colIndex = Math.floor(Math.random() * n);
    addParticleAt(rowIndex, colIndex);
  };

  const resetGrid = () => {
    const newState = Array.from({ length: n }, () => Array(n).fill({ hue: 0, saturation: 0, value: 0 }));
    setGridState(newState);
    setParticles([]);
    setHue(Math.random());
  };

 
  // Function to move the particles and update the grid state
  const moveParticles = () => {
    const newParticles = particles.map(particle => {
      particle.move();

      return particle;
    });

    // Create a new grid state with the particles moved and fading applied
    const newGridState = gridState.map(row => row.map(cell => {
      return { ...cell, value: Math.max(cell.value - 0.001, 0) };
    }));

    newParticles.forEach(particle => {
      newGridState[particle.row][particle.col] = {
        hue: particle.hue,
        saturation: particle.saturation,
        value: particle.value
      };
    });

    // Update the grid state and particles
    setGridState(newGridState);
    setParticles(newParticles);
  };

  // Use effect to set up the interval for random movement
  useEffect(() => {
    const intervalId = setInterval(moveParticles, 5); // Move every 500ms

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [particles]);

  return (
    <div className="grid">
      {createGrid()}
      <button onClick={resetGrid}>Reset Grid</button>
      <button onClick={addParticle}>Add a Particle</button>

    </div>
  );
}

export default Grid;
