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

    this.water = {
      paths: [null, null],
      layers: [null, null],
    };

    paper.settings.applyMatrix = false;

    this.initializeCanvas();
    this.initializeLayers();
    this.drawWaterPaths();
    paper.view.onFrame = this.animateWaterPaths.bind(this);
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
    this.water.layers[0] = new paper.Layer();
    this.water.layers[1] = new paper.Layer();
    this.water.layers[1].translate(new paper.Point(10, 10));
  }

  drawWaterPaths() {
    const { width } = paper.view.size;
    const center = paper.view.center;

    this.water.paths[0] = new paper.Path();
    this.water.paths[0].strokeColor = COLORS.darkBlue;
    this.water.paths[0].strokeWidth = 2;
  
    // first point
    this.water.paths[0].add([0, 0]);
  
    // middle points
    for (var i = 1; i < POINTS; i++) {
      const point = new paper.Point(width / POINTS * i, center.y);
      this.water.paths[0].add(point);
    }
  
    // last point
    this.water.paths[0].add([width, 0]);
  
    // DEBUG: Show points on path
    // this.water.paths[0].fullySelected = true;

    this.water.paths[1] = this.water.paths[0].clone();
    this.water.paths[1].strokeColor = COLORS.lightBlue;

    this.water.layers[0].addChild(this.water.paths[0]);
    this.water.layers[1].addChild(this.water.paths[1]);
  }

  animateWaterPaths(event) {
    for (var i = 1; i < POINTS; i++) {
      const sinSeed = event.count + (i + i % 10) * 100;
      const yPos = sinNoise(sinSeed);
      this.water.paths[0].segments[i].point.y = yPos;
      this.water.paths[1].segments[i].point.y = yPos;
    }
     
    // Apply smooth
    this.water.paths[0].smooth({ type: 'continuous' });
    this.water.paths[1].smooth({ type: 'continuous' });
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