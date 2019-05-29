import React, {Component} from 'react';
import paper from 'paper';
import './index.css';

const PI = Math.PI.toFixed(4);

const POINTS = 10;
const NOISE_HEIGHT = 20;
const COLORS = {
  darkBlue: '#0073E5',
  lightBlue: '#00E7D8',
  black: '#000000',
  purple: '#F900FD',
  gray: '#C9C9C9',
};

const sinNoise = seed => {
  const SPEED1 = 200;
  const SPEED2 = 100;
  const sin1 = Math.sin(seed / SPEED1) * NOISE_HEIGHT;
  const sin2 = Math.sin(seed / SPEED2) * sin1;
  return sin2;
}

/**
 * 
 * Expect:
 * 0 -> 0
 * 0.5 -> 1
 * 1 -> 0
 */
const wave = (x, phase = 0) => {
  return Math.sin(PI * 2 * x  - (PI / 2) - (phase * 2 * PI)).toFixed(4) * 0.5 + 0.5;
}

/**
 * Takes 2 colors and returns an array of gradient stops between those colors.
 * Phase allows us to shift the gradient.
 * wave() function is used to interpolate between colors.
 */
const generateGradient = (color1, color2, phase) => {
  const colorDelta = {
    red: color2.red - color1.red,
    green: color2.green - color1.green,
    blue: color2.blue - color1.blue,
  };

  const xPoints = [
    0,
    Math.max(phase - 0.5, 0),
    phase,
    Math.min(phase + 0.5, 1),
    1,
  ];

  const yPoints = xPoints.map(point => {
    return new paper.Color([
      color1.red + (colorDelta.red * wave(point, phase)),
      color1.green + (colorDelta.green * wave(point, phase)),
      color1.blue + (colorDelta.blue * wave(point, phase)),
    ]);
  });

  const xyPoints = xPoints.map((point, key) => [yPoints[key], point]);

  return new paper.Gradient(xyPoints);
}

class PoolPaper {
  constructor(props) {
    this.wrapper = props.wrapper;

    this.water = {
      paths: [null, null],
      layers: [null, null],
    };

    this.pool = {
      paths: [null],
    };

    paper.settings.applyMatrix = false;

    this.initializeCanvas();
    this.initializeLayers();
    this.drawWaterPaths();
    this.drawPoolPaths();
    this.colorPoolPaths(0.9);

    paper.view.onFrame = this.onFrame.bind(this);
  }

  onFrame(event) {
    this.animateWaterPaths(event);
    this.animatePoolPaths(event);
  }

  initializeCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'paper-canvas';
    this.wrapper.appendChild(canvas);
    paper.setup(canvas);
  
    const { height } = paper.view.size;
  
    // Shift our global vertical center to be the middle
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

  drawPoolPaths() {
    const POOL_PATH_LENGTH = 200;
    const {height} = paper.view.size;
    const center = paper.view.center;

    this.pool.paths[0] = new paper.Path();
    this.pool.paths[0].strokeWidth = 5;

    this.pool.paths[0].add([center.x, height / -2]);
    this.pool.paths[0].add([center.x, (height / -2) + POOL_PATH_LENGTH]);
  }

  colorPoolPaths(phase = 0) {
    const {topLeft, bottomLeft} = this.pool.paths[0].bounds;
    const generatedGradient = generateGradient(new paper.Color(COLORS.gray), new paper.Color(COLORS.purple), phase);
    const gradientColor = new paper.Color(generatedGradient, topLeft, bottomLeft);
    this.pool.paths[0].strokeColor = gradientColor;
    this.pool.paths[0].strokeColor.highlight = topLeft;
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

  animatePoolPaths(event) {
    const {count} = event;
    const phase = (count % 100) / 100;
    this.colorPoolPaths(phase);
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