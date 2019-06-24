import paper from 'paper-jsdom-canvas'
import PoolAnimation from './PoolAnimation'
import IconAnimation from './IconAnimation'

class PaperAnimation {
  constructor (props) {
    const { wrapper, sample = {} } = props
    paper.settings.applyMatrix = false

    this.wrapper = wrapper
    this.sample = sample

    this.initializeCanvas()

    this.iconAnimation = new IconAnimation({ sample })
    this.poolAnimation = new PoolAnimation({ sample })

    paper.view.onFrame = this.onFrame.bind(this)
  }

  updateProps ({ sample }) {
    this.sample = sample
    this.iconAnimation.updateProps({ sample })
    this.poolAnimation.updateProps({ sample })
  }

  onFrame (event) {
    this.iconAnimation.animate(event)
    this.poolAnimation.animate(event)
  }

  initializeCanvas () {
    const canvas = document.createElement('canvas')
    canvas.id = 'paper-canvas'
    canvas.setAttribute('resize', '')
    this.wrapper.append(canvas)
    paper.setup(canvas)

    const { height, width } = paper.view.size
    // Shift our global vertical center to be the middle
    paper.view.translate([width / 2, height / 2])
  }

  initializeLayers () {
    this.iconAnimation.layers[0] = new paper.Group()
    this.poolAnimation.layers[0] = new paper.Group()

    this.poolAnimation.layers[0].sendToBack()
    this.iconAnimation.layers[0].sendToBack()
  }
}

export default PaperAnimation
