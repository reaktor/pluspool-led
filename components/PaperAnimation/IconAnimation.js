import paper from 'paper-jsdom-canvas'
import { COLORS, POINTS } from '../../helpers/constants'
import { waveSine } from '../../helpers/functions'

class IconAnimation {
  constructor (props) {
    const { sample } = props
    this.sample = sample
    this.paths = [null, null]
    this.layers = [null, null]
  }

  updateProps ({ sample }) {
    this.sample = sample
  }

  draw () {
    const { width } = paper.view.size
    const { center } = paper.view

    this.paths[0] = new paper.Path()
    this.paths[0].strokeColor = COLORS.darkBlue
    this.paths[0].strokeWidth = 2

    // First point
    this.paths[0].add([width / -2, 0])

    // Middle points
    for (let i = 1; i < POINTS; i++) {
      const point = new paper.Point((width / POINTS) * i - width / 2, center.y)
      this.paths[0].add(point)
    }

    // Last point
    this.paths[0].add([width / 2, 0])

    // DEBUG: Show points on path
    // this.paths[0].fullySelected = true;

    this.paths[1] = this.paths[0].clone()
    this.paths[1].strokeColor = COLORS.lightBlue

    this.layers[0].addChild(this.paths[0])
    this.layers[1].addChild(this.paths[1])
  }

  animate (event) {
    for (let i = 1; i < POINTS; i++) {
      const sinSeed = event.count + (i + (i % 10)) * 100
      const yPos = waveSine(sinSeed)
      this.paths[0].segments[i].point.y = yPos
      this.paths[1].segments[i].point.y = yPos
    }

    // Apply smooth
    this.paths[0].smooth({ type: 'continuous' })
    this.paths[1].smooth({ type: 'continuous' })
  }
}

export default IconAnimation
