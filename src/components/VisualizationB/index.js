import React, {Component} from 'react';
import paper from 'paper';
import './index.css';

const POINTS = 10;
const NOISE_HEIGHT = 20;
const COLORS = {
  darkBlue: '#0073E5',
  lightBlue: '#00E7D8',
}

const sinNoise = seed => {
  const SPEED1 = 200;
  const SPEED2 = 100;
  const sin1 = Math.sin(seed / SPEED1) * NOISE_HEIGHT;
  const sin2 = Math.sin(seed / SPEED2) * sin1;
  return sin2;
}

class PoolPaper {
  constructor(props) {
    this.wrapper = props.wrapper;
    this.path1 = null;
    this.path2 = null;
    this.layer1 = null;
    this.layer2 = null;

    paper.settings.applyMatrix = false;

    this.initializeCanvas();
    this.initializeLayers();
    this.drawWaterPaths();
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

  initializeLayers() {    
    this.layer1 = new paper.Layer();
    this.layer2 = new paper.Layer();
    this.layer2.translate(new paper.Point(10, 10));
  }

  drawWaterPaths() {
    const { width } = paper.view.size;
    const center = paper.view.center;

    this.path1 = new paper.Path();
    this.path1.strokeColor = COLORS.darkBlue;
    this.path1.strokeWidth = 2;
  
    // first point
    this.path1.add([0, 0]);
  
    // middle points
    for (var i = 1; i < POINTS; i++) {
      const point = new paper.Point(width / POINTS * i, center.y);
      this.path1.add(point);
    }
  
    // last point
    this.path1.add([width, 0]);
  
    // DEBUG: Show points on path
    // this.path1.fullySelected = true;

    this.path2 = this.path1.clone();
    this.path2.strokeColor = COLORS.lightBlue;

    this.layer1.addChild(this.path1);
    this.layer2.addChild(this.path2);
  }

  onFrame(event) {
    for (var i = 1; i < POINTS; i++) {
      const sinSeed = event.count + (i + i % 10) * 100;
      const yPos = sinNoise(sinSeed);
      this.path1.segments[i].point.y = yPos;
      this.path2.segments[i].point.y = yPos;
    }
     
    // Apply smooth
    this.path1.smooth({ type: 'continuous' });
    this.path2.smooth({ type: 'continuous' });
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
    new PoolPaper({ wrapper });
  }

  render() {
    return (
      <div className="Visualization" ref={this.wrapper} />
    );
  }
}

export default Visualization;