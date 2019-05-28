import React, {Component} from 'react';
import paper from 'paper';
import './index.css';

const POINTS = 10;
const NOISE_HEIGHT = 100;

class PoolPaper {
  constructor(props) {
    this.wrapper = props.wrapper;
    this.path = null;

    this.initializeCanvas();
    this.initializePath();
    paper.view.onFrame = this.onFrame.bind(this);
  }

  initializeCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'paper-canvas';
    this.wrapper.appendChild(canvas);
    paper.setup(canvas);
  
    const { height } = paper.view.size;
  
    // Shift our vertical center to be the middle
    paper.view.translate([0, height/2]);
  };

  initializePath() {
    const { width } = paper.view.size;
    const center = paper.view.center;
    this.path = new paper.Path();
    this.path.strokeColor = 'black';
  
    // first point
    this.path.add([0, 0]);
  
    // middle points
    for (var i = 1; i < POINTS; i++) {
      const point = new paper.Point(width / POINTS * i, center.y);
      this.path.add(point);
    }
  
    // last point
    this.path.add([width, 0]);
  
    // DEBUG: Show points on path
    this.path.fullySelected = true;
  }

  onFrame(event) {
    for (var i = 1; i < POINTS; i++) {
      const sinSeed = event.count + (i + i % 10) * 100;
      const sinHeight = Math.sin(sinSeed / 200) * NOISE_HEIGHT;
      const yPos = Math.sin(sinSeed / 100) * sinHeight;
      this.path.segments[i].point.y = yPos;
    }
    
    this.path.smooth({ type: 'continuous' });
  }
}

class Visualization extends Component {
  constructor(props) {
    super(props);

    // Wrapper ref to inject canvas into
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    const wrapper = this.wrapper.current;
    new PoolPaper({wrapper});
  }

  render() {
    return (
      <div className="Visualization" ref={this.wrapper} />
    );
  }
}

export default Visualization;