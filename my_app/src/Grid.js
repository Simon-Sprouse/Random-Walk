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


    const addParticleAt = (rowIndex, colIndex) => {

        const newParticle = new Particle(rowIndex, colIndex, n);
        setParticles([...particles, newParticle]);

        const newGridState = gridState.map(row => row.map(cell => Math.max(cell - 1, 0)));
        particles.forEach(particle => {
        newGridState[particle.row][particle.col] = 255;
        });
        newGridState[rowIndex][colIndex] = 255;
        setGridState(newGridState);
    };


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

    
    const moveParticles = () => {
        const newParticles = particles.map(particle => {
        particle.move();
        return particle;
        });

        const newGridState = gridState.map(row => row.map(cell => Math.max(cell - 1, 0)));
        newParticles.forEach(particle => {
        newGridState[particle.row][particle.col] = 255;
        });

        setGridState(newGridState);
        setParticles(newParticles);
    };

    const twoParticles = () => {

    }


    useEffect(() => {
        const intervalId = setInterval(moveParticles, 5); // Move every __ ms
        return () => clearInterval(intervalId);
    }, [particles]);

    return (
        <div className="grid">
        {createGrid()}
        <button onClick={resetGrid}>Reset Grid</button>
        <button onClick={addParticle}>Add a Particle</button>
        <button onClick={twoParticles}>Two Particles</button>
        </div>
    );
}

export default Grid;
