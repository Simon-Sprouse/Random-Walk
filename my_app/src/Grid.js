// src/Grid.js
import React, { useState, useEffect } from 'react';
import Particle from './Particle';
import './Grid.css';

function Grid({ n }) {
    const initialGridState = Array.from({ length: n }, () => Array(n).fill(-1));

    const [gridState, setGridState] = useState(initialGridState);
    const [particles, setParticles] = useState([]);

    const createGrid = () => {
        return gridState.map(
            (row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`cell ${cell === 1 ? 'on' : 'off'}`}
                        onClick={() => addParticleAt(rowIndex, colIndex)}
                    ></div>
                    ))}
                </div>
            )
        );
    };

    const addParticleAt = (rowIndex, colIndex) => {
        const newParticle = new Particle(rowIndex, colIndex, n);
        setParticles([...particles, newParticle]);

        const newGridState = gridState.map(row => row.map(cell => -1));
        particles.forEach(
            particle => {
                newGridState[particle.row][particle.col] = 1;
            }
        );
        newGridState[rowIndex][colIndex] = 1;
        setGridState(newGridState);
    };

    
    const addParticle = () => {
        const rowIndex = Math.floor(Math.random() * n);
        const colIndex = Math.floor(Math.random() * n);
        addParticleAt(rowIndex, colIndex);
    };

    const resetGrid = () => {
        const newState = Array.from({ length: n }, () => Array(n).fill(-1));
        setGridState(newState);
        setParticles([]);
    };

 
    const moveParticles = () => {
        const newParticles = particles.map(
            particle => {
                particle.move();
                return particle;
            }
        );

        const newGridState = gridState.map(row => row.map(cell => -1));
        newParticles.forEach(
            particle => {
                newGridState[particle.row][particle.col] = 1;
            }
        );

        setGridState(newGridState);
        setParticles(newParticles);
    };

    // Use effect to set up the interval for random movement
    useEffect(() => {
        const intervalId = setInterval(moveParticles, 100); // Move every 500ms

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
