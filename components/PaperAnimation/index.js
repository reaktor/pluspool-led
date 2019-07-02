import paper from 'paper-jsdom-canvas'
import IconAnimation from './IconAnimation'

class PaperAnimation {
  constructor ({ wrapper, ...rest }) {
    this.wrapper = wrapper
    this.sample = {}

    const canvas = this.initializeCanvas()
    this.iconAnimation = new IconAnimation({ canvas, ...rest })

    paper.view.onFrame = this.onFrame.bind(this)
  }

  updateProps ({ sample }) {
    this.sample = sample
  }

  onFrame (event) {
    if (this.iconAnimation) {
      this.iconAnimation.updateProps({ sample: this.sample })
      this.iconAnimation.animate(event)
    }
  }

  initializeCanvas () {
    const canvas = document.createElement('canvas')
    canvas.id = 'paper-canvas'
    canvas.setAttribute('resize', '')
    this.wrapper.append(canvas)
    paper.setup(canvas)
    return canvas
  }

  initializeLayers () {
    this.iconAnimation.layers[0] = new paper.Group()
  }
}

export default PaperAnimation
