import paper from 'paper-jsdom-canvas'
import { iconSize } from '../../helpers/drawing'
import { ICON_SVG_PATHS } from '../../helpers/constants'
import { dataValues } from '../../helpers/data'

const makeEven = number => Math.floor(number / 2) * 2

const iconKeys = Object.keys(ICON_SVG_PATHS)

const sineWave = ({
  amplitude = 1,
  frequency = 1,
  phase = 1,
  x
}) => amplitude * Math.sin(frequency * x + phase)

class IconAnimation {
  constructor ({ canvas, onIconClick }) {
    this.canvas = canvas
    this.sample = {}
    this.iconSymbols = {
      bacteria: null,
      direction: null,
      oxygen: null,
      salinity: null,
      speed: null,
      turbidity: null
    }
    this.iconInstances = []
    this.layers = [null]
    this.hoveredIcon = { row: null, column: null }
    this.onIconClick = onIconClick

    this.layers[0] = new paper.Group()

    this.layers[0].onMouseLeave = () => {
      this.hoveredIcon = { row: null, column: null }
      this.setCursor('auto')
    }

    this.loadIcons().then(() => {
      this.draw()
    })
  }

  updateProps ({ sample }) {
    this.sample = sample
  }

  loadIcon (iconPath) {
    return new Promise((resolve, reject) => {
      paper.project.importSVG(iconPath, {
        onLoad: resolve,
        onError: reject
      })
    })
  }

  async loadIcons () {
    const promises = Object.entries(ICON_SVG_PATHS)
      .map(([key, iconPath]) => (
        this.loadIcon(iconPath)
          .then(icon => {
            icon.fillColor = 'transparent'
            const circle = new paper.Shape.Circle(50)
            circle.fillColor = '#000000'
            const group = new paper.Group([icon])
            const symbol = new paper.SymbolDefinition(group)
            this.iconSymbols[key] = symbol
          })
          .catch(() => console.warn(`${key} icon was not loaded`))
      ))

    await Promise.all(promises)
  }

  setCursor (cursor) {
    window.requestAnimationFrame(() => {
      this.canvas.style.cursor = cursor
    })
  }

  draw () {
    const { width, height } = paper.view.size
    const size = iconSize({ width, height })
    const divisionsWidth = makeEven(Math.floor(width / size))
    const divisionsHeight = makeEven(Math.floor(height / size))

    for (let column = 0; column < divisionsWidth; column++) {
      for (let row = 0; row < divisionsHeight; row++) {
        const randIconIndex = Math.floor(Math.random() * iconKeys.length)
        const icon = iconKeys[randIconIndex]
        const symbol = this.iconSymbols[icon]

        if (symbol) {
          const instance = new paper.SymbolItem(symbol)
          this.layers[0].addChild(instance)
          instance.onClick = () => this.onIconClick({ icon })
          instance.onMouseEnter = () => {
            this.setCursor('pointer')
            this.hoveredIcon = { row, column }
          }

          this.iconInstances.push({ instance, row, column })
        }
      }
    }
  }

  animate ({ count }) {
    const { width, height } = paper.view.size
    const size = iconSize({ width, height })
    const divisionsWidth = makeEven(Math.floor(width / size))
    const divisionsHeight = makeEven(Math.floor(height / size))
    const remainderWidth = width - (divisionsWidth * size)
    const remainderHeight = height - (divisionsHeight * size)

    this.iconInstances.map(({ instance, row, column }) => {
      const isHovered = (
        row === this.hoveredIcon.row &&
        column === this.hoveredIcon.column
      )
      const { width: instanceWidth } = instance.bounds
      isHovered
        ? instance.scale((size * 1.4) / instanceWidth)
        : instance.scale(size / instanceWidth)
      const yShift = sineWave({
        amplitude: 5,
        period: 0.2,
        phase: count * 0.1,
        x: column
      })
      const xPos = (column * size) + (size / 2) + (remainderWidth / 2)
      const yPos = (row * size) + (size / 2) + (remainderHeight / 2) + yShift
      instance.position = new paper.Point(xPos, yPos)
    })
  }
}

export default IconAnimation
