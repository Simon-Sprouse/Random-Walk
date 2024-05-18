// src/Grid.js
import React, { useState, useEffect } from 'react';
import Particle from './Particle';
import './Grid.css';

function Grid({ n }) {
  const initialGridState = Array.from({ length: n }, () => Array(n).fill(0));

  const [gridState, setGridState] = useState(initialGridState);
  const [particles, setParticles] = useState([]);

  const createGrid = () => {
    return gridState.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="cell"
            style={{ backgroundColor: `rgb(${cell}, ${cell}, ${cell})` }}
            onClick={() => addParticleAt(rowIndex, colIndex)}
          ></div>
        ))}
      </div>
    ));
  };

  // Function to add a particle at the specified position
  const addParticleAt = (rowIndex, colIndex) => {
    const newParticle = new Particle(rowIndex, colIndex, n);
    setParticles([...particles, newParticle]);

    // Update the grid state to reflect the new particle's position
    const newGridState = gridState.map(row => row.map(cell => Math.max(cell - 1, 0)));
    particles.forEach(particle => {
      newGridState[particle.row][particle.col] = 255;
    });
    newGridState[rowIndex][colIndex] = 255;
    setGridState(newGridState);
  };

  // Function to add a particle at a random location
  const addParticle = () => {
    const rowIndex = Math.floor(Math.random() * n);
    const colIndex = Math.floor(Math.random() * n);
    addParticleAt(rowIndex, colIndex);
  };

  const resetGrid = () => {
    const newState = Array.from({ length: n }, () => Array(n).fill(0));
    setGridState(newState);
    setParticles([]);
  };

  const halfResetGrid = () => {
    const newState = Array.from({ length: n }, (_, rowIndex) =>
      Array.from({ length: n }, (_, colIndex) =>
        colIndex < n / 2 ? 1 : 0
      )
    );
    setGridState(newState);
    setParticles([]);
  };

  // Function to move the particles and update the grid state
  const moveParticles = () => {
    const newParticles = particles.map(particle => {
      particle.move();
      return particle;
    });

    // Create a new grid state with the particles moved and decay applied
    const newGridState = gridState.map(row => row.map(cell => Math.max(cell - 1, 0)));
    newParticles.forEach(particle => {
      newGridState[particle.row][particle.col] = 255;
    });

    // Update the grid state and particles
    setGridState(newGridState);
    setParticles(newParticles);
  };

  // Use effect to set up the interval for random movement
  useEffect(() => {
    const intervalId = setInterval(moveParticles, 50); // Move every 500ms

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [particles]);

  return (
    <div className="grid">
      {createGrid()}
      <button onClick={resetGrid}>Reset Grid</button>
      <button onClick={halfResetGrid}>Half Reset Grid</button>
      <button onClick={addParticle}>Add a Particle</button>
    </div>
  );
}

export default Grid;
