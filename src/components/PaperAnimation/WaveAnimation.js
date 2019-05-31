import paper from 'paper';
import {COLORS, POINTS} from './constants.js';
import {waveSine} from './functions.js';

class WaveAnimation {
  constructor(props) {
    const {data} = props;
    this.data = data;
    this.paths = [null, null];
    this.layers = [null, null];
  }

  updateProps({data}) {
    this.data = data;
  }

  draw() {
    const { width } = paper.view.size;
    const center = paper.view.center;

    this.paths[0] = new paper.Path();
    this.paths[0].strokeColor = COLORS.darkBlue;
    this.paths[0].strokeWidth = 2;
  
    // first point
    this.paths[0].add([width/-2, 0]);
  
    // middle points
    for (var i = 1; i < POINTS; i++) {
      const point = new paper.Point((width / POINTS * i) - width/2, center.y);
      this.paths[0].add(point);
    }
  
    // last point
    this.paths[0].add([width/2, 0]);
  
    // DEBUG: Show points on path
    // this.paths[0].fullySelected = true;

    this.paths[1] = this.paths[0].clone();
    this.paths[1].strokeColor = COLORS.lightBlue;

    this.layers[0].addChild(this.paths[0]);
    this.layers[1].addChild(this.paths[1]);
  }

  animate(event) {
    for (var i = 1; i < POINTS; i++) {
      const sinSeed = event.count + (i + i % 10) * 100;
      const yPos = waveSine(sinSeed);
      this.paths[0].segments[i].point.y = yPos;
      this.paths[1].segments[i].point.y = yPos;
    }
     
    // Apply smooth
    this.paths[0].smooth({ type: 'continuous' });
    this.paths[1].smooth({ type: 'continuous' });
  }
}

export default WaveAnimation;