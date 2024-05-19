// src/Particle.js
class Particle {
    constructor(row, col, gridSize, hue) {
      this.row = row;
      this.col = col;
      this.gridSize = gridSize;
      this.hue = hue;
      this.saturation = 1; // 100% saturation
      this.value = 1;     // 100% value
    }
  
    // Method to move the particle randomly
    move() {
      const directions = [
        { dRow: -1, dCol: 0 },  // up
        { dRow: 1, dCol: 0 },   // down
        { dRow: 0, dCol: -1 },  // left
        { dRow: 0, dCol: 1 },   // right
        { dRow: 0, dCol: 0 }    // no movement
      ];
  
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
      const newRow = this.row + randomDirection.dRow;
      const newCol = this.col + randomDirection.dCol;
  
      if (newRow >= 0 && newRow < this.gridSize && newCol >= 0 && newCol < this.gridSize) {
        this.row = newRow;
        this.col = newCol;
      }
    }
  
    // // Method to decrease the saturation
    // fade() {
    //   this.value = Math.max(this.value - 0.01, 0); // Decrease saturation by 1% each frame
    // }
  }
  
  export default Particle;
  