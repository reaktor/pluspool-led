import {PI, NOISE_HEIGHT} from './constants.js';


// Used to move the 2 wave lines
const waveSine = seed => {
  const SPEED1 = 20;
  const SPEED2 = SPEED1 / 2;
  const sin1 = Math.sin(seed / SPEED1) * NOISE_HEIGHT;
  const sin2 = Math.sin(seed / SPEED2) * sin1;
  return sin2;
}

/**
 * 
 * Expect:
 * 0 -> 0
 * 0.5 -> 1
 * 1 -> 0
 */
const gradientWave = (x, phase = 0) => {
  return Math.sin(PI * 2 * x  - (PI / 2) - (phase * 2 * PI)).toFixed(4) * 0.5 + 0.5;
}

export {
  gradientWave,
  waveSine
};