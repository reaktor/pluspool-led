import paper from 'paper-jsdom-canvas'
import { normalizations } from '../../helpers/data'
import { COLORS } from '../../helpers/constants'
import { gradientWave } from '../../helpers/functions'

/**
 * Start from 12 o'clock and go clock wise
 */
const POOL_PATHS = [
  [[-1, -5], [1, -5]],
  [[1, -5], [1, -3]],
  [[1, -3], [1, -1]],
  [[1, -1], [5, -1]],
  [[5, -1], [5, 1]],
  [[5, 1], [1, 1]],
  [[1, 1], [1, 3]],
  [[1, 3], [1, 5]],
  [[1, 5], [-1, 5]],
  [[-1, 5], [-1, 3]],
  [[-1, 3], [-1, 1]],
  [[-1, 1], [-3, 1]],
  [[-3, 1], [-5, 1]],
  [[-5, 1], [-5, -1]],
  [[-5, -1], [-3, -1]],
  [[-3, -1], [-1, -1]],
  [[-1, -1], [-1, -3]],
  [[-1, -3], [-1, -5]]
]

const POOL_PATH_SCALE = 60
const POOL_PATH_OUTSET = 30

/**
 * Takes 2 colors and returns an array of gradient stops between those colors.
 * Phase allows us to shift the gradient.
 * gradientWave() function is used to interpolate between colors.
 * @param {paper.Color} from starting color
 * @param {paper.Color} to ending color
 * @param {number} phase how quickly to blend
 * @returns {paper.Gradient} a bunch of colors
 */
const generateGradient = (from, to, phase) => {
  const colorDelta = {
    red: to.red - from.red,
    green: to.green - from.green,
    blue: to.blue - from.blue
  }

  const xPoints = [
    0,
    Math.max(phase - 0.5, 0),
    phase,
    Math.min(phase + 0.5, 1),
    1
  ]

  const yPoints = xPoints.map(point => {
    return new paper.Color([
      from.red + colorDelta.red * gradientWave(point, phase),
      from.green + colorDelta.green * gradientWave(point, phase),
      from.blue + colorDelta.blue * gradientWave(point, phase)
    ])
  })

  const xyPoints = xPoints.map((point, key) => [yPoints[key], point])

  return new paper.Gradient(xyPoints)
}

const blend = (num1, num2, value) => (num2 - num1) * value + num1

/*
 * Blend two colors into a single color
 * @param {First color} from color to blend from
 * @param {Second color} to color to blend to
 * @param {Blend value} value how much to blend (0-1)
 */
const blendColors = (from, to, value) => ({
  red: blend(from.red, to.red, value),
  green: blend(from.green, to.green, value),
  blue: blend(from.blue, to.blue, value)
})

class PoolAnimation {
  constructor (props) {
    const { sample } = props
    this.sample = sample
    this.backgroundPath = null
    this.paths = [null]
    this.layers = [null]

    this.layers[0] = new paper.Group()
    this.draw()
  }

  updateProps ({ sample }) {
    this.sample = sample
  }

  draw () {
    const { height, width } = paper.view.size

    this.backgroundPath = new paper.Path()
    this.backgroundPath.fillColor = COLORS.black
    this.backgroundPath.strokeWidth = POOL_PATH_SCALE
    this.backgroundPath.strokeColor = COLORS.black

    POOL_PATHS.map((path, index) => {
      // Grab our points
      const segment1A = path[0][0]
      const segment1B = path[0][1]
      const segment2A = path[1][0]
      const segment2B = path[1][1]

      // Convert our points from unit of 1 scale to drawing scale
      const scaledSegment1A = segment1A * POOL_PATH_SCALE
      const scaledSegment1B = segment1B * POOL_PATH_SCALE
      const scaledSegment2A = segment2A * POOL_PATH_SCALE
      const scaledSegment2B = segment2B * POOL_PATH_SCALE

      // Grow each point by our outset value
      const outsetSegment1A = scaledSegment1A + (Math.sign(scaledSegment1A) * POOL_PATH_OUTSET)
      const outsetSegment1B = scaledSegment1B + (Math.sign(scaledSegment1B) * POOL_PATH_OUTSET)
      const outsetSegment2A = scaledSegment2A + (Math.sign(scaledSegment2A) * POOL_PATH_OUTSET)
      const outsetSegment2B = scaledSegment2B + (Math.sign(scaledSegment2B) * POOL_PATH_OUTSET)

      // Shift points to be in center of screen
      const shiftedSegment1A = outsetSegment1A + (width / 2)
      const shiftedSegment1B = outsetSegment1B + (height / 2)
      const shiftedSegment2A = outsetSegment2A + (width / 2)
      const shiftedSegment2B = outsetSegment2B + (height / 2)

      const point1 = [
        shiftedSegment1A,
        shiftedSegment1B
      ]
      const point2 = [
        shiftedSegment2A,
        shiftedSegment2B
      ]

      /**
       * Gradient line
       */
      this.paths[index] = new paper.Path()
      this.paths[index].strokeWidth = 5
      this.paths[index].strokeCap = 'round'

      this.paths[index].add(point1)
      this.paths[index].add(point2)

      this.layers[0].addChild(this.paths[index])

      /**
       * Background shape
       */
      this.backgroundPath.add(point1)
      this.backgroundPath.add(point2)
    })

    this.backgroundPath.closed = true
    this.layers[0].insertChild(0, this.backgroundPath)
  }

  color (phase = 0) {
    if (!this.sample) return
    const from = blendColors(
      new paper.Color(COLORS.gray),
      new paper.Color(COLORS.white),
      1
    )

    const to = blendColors(
      new paper.Color(COLORS.purple),
      new paper.Color(COLORS.yellow),

      normalizations['Percent Oxygen_SDI_0_10_%'](
        this.sample['Percent Oxygen_SDI_0_10_%']
      )
    )

    this.paths.map((path, index) => {
      const startPoint = path.segments[0].curve.point1
      const endPoint = path.segments[1].curve.point2
      const generatedGradient = generateGradient(from, to, phase)
      const gradientColor = new paper.Color(
        generatedGradient,
        startPoint,
        endPoint
      )
      this.paths[index].strokeColor = gradientColor
      return path
    })
  }

  animate (event) {
    const { count } = event
    const phase = (count % 100) / 100
    this.color(phase)
  }
}

export default PoolAnimation
