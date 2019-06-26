import paper from 'paper-jsdom-canvas'
import { iconSize } from '../../helpers/drawing'
import { ICON_SIZE } from '../../helpers/constants'

const makeEven = number => Math.floor(number / 2) * 2

const ICON_COLORS = {
  bacteria: '#BB3D13',
  oxygen: '#006093',
  speed: '#FAA400',
  salinity: '#672F98',
  turbidity: '#A85A38',
  direction: '#005037'
}

const icons = {
  bacteria: '/static/img/icons/bacteria.svg',
  direction: '/static/img/icons/direction.svg',
  oxygen: '/static/img/icons/oxygen.svg',
  salinity: '/static/img/icons/salinity.svg',
  speed: '/static/img/icons/speed.svg',
  turbidity: '/static/img/icons/turbidity.svg'
}

const iconKeys = Object.keys(icons)

class IconAnimation {
  constructor ({ sample }) {
    this.sample = sample
    this.iconSymbols = {
      bacteria: null,
      direction: null,
      oxygen: null,
      salinity: null,
      speed: null,
      turbidity: null
    }
    this.layers = [null]

    this.layers[0] = new paper.Group()
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
    Object.entries(icons)
    const promises = Object.entries(icons).map(([key, iconPath]) => (
      this.loadIcon(iconPath)
        .then(icon => {
          icon.fillColor = ICON_COLORS[key]
          const group = new paper.Group([icon])
          const symbol = new paper.SymbolDefinition(group)
          this.iconSymbols[key] = symbol
        })
        .catch(() => console.warn(`${key} icon was not loaded`))
    ))

    await Promise.all(promises)
  }

  draw () {
    const { width, height } = paper.view.size
    const size = iconSize({ width, height })
    const divisionsWidth = makeEven(Math.floor(width / size))
    const divisionsHeight = makeEven(Math.floor(height / size))
    const remainderWidth = width - (divisionsWidth * size)
    const remainderHeight = height - (divisionsHeight * size)

    for (let column = 0; column < divisionsWidth; column++) {
      for (let row = 0; row < divisionsHeight; row++) {
        const randIconIndex = Math.floor(Math.random() * iconKeys.length)
        const randIcon = iconKeys[randIconIndex]
        const symbol = this.iconSymbols[randIcon]

        if (symbol) {
          const instance = new paper.SymbolItem(symbol)
          instance.scale(size / ICON_SIZE)
          const xPos = (column * size) + (size / 2) + (remainderWidth / 2)
          const yPos = (row * size) + (size / 2) + (remainderHeight / 2)
          instance.position = new paper.Point(xPos, yPos)
          this.layers[0].addChild(instance)
        }
      }
    }
  }

  animate (event) {
  }
}

export default IconAnimation
