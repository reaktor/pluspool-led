import paper from 'paper-jsdom-canvas'

const ICON_SIZE = 40

const icons = {
  bacteria: '/static/img/icons/bacteria.svg',
  // direction: '/static/img/icons/direction.svg',
  // oxygen: '/static/img/icons/oxygen.svg',
  // salinity: '/static/img/icons/salinity.svg',
  // speed: '/static/img/icons/speed.svg',
  // turbidity: '/static/img/icons/turbidity.svg'
}

class IconAnimation {
  constructor (props) {
    const { sample } = props
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
    return new Promise(resolve => {
      paper.project.importSVG(iconPath, icon => {
        const group = new paper.Group(icon)
        const symbol = new paper.SymbolDefinition(group)
        resolve(symbol)
      })
    })
  }

  async loadIcons () {
    const promises = Object.keys(icons).map((key) => {
      const iconPath = icons[key]
      return this.loadIcon(iconPath).then(icon => {
        this.iconSymbols[key] = icon
      })
    })

    await Promise.all(promises)
  }

  draw () {
    const { width, height } = paper.view.size

    const divisionsWidth = Math.floor(width / ICON_SIZE)
    const divisionsHeight = Math.floor(height / ICON_SIZE)
    const remainderWidth = width % ICON_SIZE
    const remainderHeight = height % ICON_SIZE

    for (let column = 0; column <= divisionsWidth; column++) {
      for (let row = 0; row <= divisionsHeight; row++) {
        const instance = new paper.SymbolItem(this.iconSymbols.bacteria)
        const xPos = (column * ICON_SIZE) - (width / 2) + (remainderWidth / 2)
        const yPos = (row * ICON_SIZE) - (height / 2) + (remainderHeight / 2)
        instance.position = new paper.Point(xPos, yPos)
      }
    }
  }

  animate (event) {
  }
}

export default IconAnimation
