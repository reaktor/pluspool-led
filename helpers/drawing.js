import { PI, ICON_SIZE } from './constants'

/**
 *
 * Expect:
 * 0 -> 0
 * 0.5 -> 1
 * 1 -> 0
 * @param {number} x distance along the wave
 * @param {number} phase how far to shift the phase
 * @returns {number} y value along sin wave
 */
const gradientWave = (x, phase = 0) => {
  return Math.sin(PI * 2 * x - PI / 2 - phase * 2 * PI).toFixed(4) * 0.5 + 0.5
}

const iconSize = ({ width, height }) => {
  const minDivisions = 14
  const smallestDimension = width > height ? height : width
  const satisfiesSmallestDimension = smallestDimension / ICON_SIZE >= minDivisions

  if (!satisfiesSmallestDimension) {
    return Math.floor(smallestDimension / minDivisions)
  }

  return ICON_SIZE
}

export { gradientWave, iconSize }
