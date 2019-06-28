import paper from 'paper-jsdom-canvas'
import { normalizations } from '../../helpers/data'
import { COLORS } from '../../helpers/constants'
import { iconSize, gradientWave } from '../../helpers/drawing'

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
    this.sample = {}
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

    const scale = iconSize({ width, height })
    const outset = scale / 2

    this.backgroundPath = new paper.Path()
    this.backgroundPath.fillColor = COLORS.black
    this.backgroundPath.strokeWidth = scale
    this.backgroundPath.strokeColor = COLORS.black

    POOL_PATHS.map((path, index) => {
      const points = path.map(([x, y]) => (
        // Convert our points from unit of 1 scale to drawing scale
        [x * scale, y * scale]
      )).map(([x, y]) => (
        // Grow each point by our outset value
        [
          x + (Math.sign(x) * outset),
          y + (Math.sign(y) * outset)
        ]
      )).map(([x, y]) => (
        // Shift points to be in center of screen
        [x + (width / 2), y + (height / 2)]
      ))

      const lineStart = points[0]
      const lineEnd = points[1]

      /**
       * Gradient line
       */
      this.paths[index] = new paper.Path()
      this.paths[index].strokeWidth = 5
      this.paths[index].strokeCap = 'round'

      this.paths[index].add(lineStart)
      this.paths[index].add(lineEnd)

      this.layers[0].addChild(this.paths[index])

      /**
       * Background shape
       */
      this.backgroundPath.add(lineStart)
      this.backgroundPath.add(lineEnd)
    })

    this.backgroundPath.closed = true
    this.layers[0].insertChild(0, this.backgroundPath)
  }

  color (phase = 0) {
    if (!this.sample) return
    const from = blendColors(
      new paper.Color(COLORS.black),
      new paper.Color(COLORS.black),
      1
    )

    const to = blendColors(
      new paper.Color(COLORS.red),
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
