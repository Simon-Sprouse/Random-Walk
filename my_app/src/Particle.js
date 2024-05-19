// src/Particle.js
class Particle {
    constructor(row, col, gridSize) {
      this.row = row;
      this.col = col;
      this.gridSize = gridSize;
    }
  
    // Method to move the particle randomly
    move() {
      // Possible movement directions: up, down, left, right, no movement
      const directions = [
        { dRow: -1, dCol: 0 },  // up
        { dRow: 1, dCol: 0 },   // down
        { dRow: 0, dCol: -1 },  // left
        { dRow: 0, dCol: 1 },   // right
        // { dRow: 0, dCol: 0 }    // no movement
      ];
  
      // Select a random direction
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
  
      // Calculate the new position
      const newRow = this.row + randomDirection.dRow;
      const newCol = this.col + randomDirection.dCol;
  
      // Check if the new position is within bounds
      if (newRow >= 0 && newRow < this.gridSize && newCol >= 0 && newCol < this.gridSize) {
        // Update the particle's position if within bounds
        this.row = newRow;
        this.col = newCol;
      }
    }
  }
  
  export default Particle;
  