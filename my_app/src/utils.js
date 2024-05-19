// src/utils.js

// Convert HSV to RGB
export function hsvToRgb(h, s, v) {
    let r, g, b;
  
    let c = v * s; // Chroma
    let x = c * (1 - Math.abs((h * 6) % 2 - 1));
    let m = v - c;
  
    if (0 <= h && h < 1 / 6) {
      r = c; g = x; b = 0;
    } else if (1 / 6 <= h && h < 2 / 6) {
      r = x; g = c; b = 0;
    } else if (2 / 6 <= h && h < 3 / 6) {
      r = 0; g = c; b = x;
    } else if (3 / 6 <= h && h < 4 / 6) {
      r = 0; g = x; b = c;
    } else if (4 / 6 <= h && h < 5 / 6) {
      r = x; g = 0; b = c;
    } else if (5 / 6 <= h && h < 6 / 6) {
      r = c; g = 0; b = x;
    } else {
      r = 0; g = 0; b = 0;
    }
  
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
  
    return [r, g, b];
  }
  
  // Convert RGB to HSV
  export function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
  
    let d = max - min;
    s = max === 0 ? 0 : d / max;
  
    if (max === min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
  
    return [h, s, v];
  }
  