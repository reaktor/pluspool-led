import { ICON_SIZE } from './constants'

const iconSize = ({ width, height }) => {
  const minDivisions = 14
  const smallestDimension = width > height ? height : width
  const satisfiesSmallestDimension = smallestDimension / ICON_SIZE >= minDivisions

  if (!satisfiesSmallestDimension) {
    return Math.floor(smallestDimension / minDivisions)
  }

  return ICON_SIZE
}

export { iconSize }
