import paper from 'paper';
import {COLORS} from './constants.js';
import {gradientWave} from './functions.js';

/**
 * Start from 12 o'clock and go clock wise
 */
const POOL_PATHS = [
  [
    [-1, -5],
    [1, -5],
  ],
  [
    [1, -5],
    [1, -3],
  ],
  [
    [1, -3],
    [1, -1],
  ],
  [
    [1, -1],
    [5, -1],
  ],
  [
    [5, -1],
    [5, 1],
  ],
  [
    [5, 1],
    [1, 1],
  ],
  [
    [1, 1],
    [1, 3],
  ],
  [
    [1, 3],
    [1, 5],
  ],
  [
    [1, 5],
    [-1, 5],
  ],
  [
    [-1, 5],
    [-1, 3]
  ],
  [
    [-1, 3],
    [-1, 1],
  ],
  [
    [-1, 1],
    [-3, 1],
  ],
  [
    [-3, 1],
    [-5, 1],
  ],
  [
    [-5, 1],
    [-5, -1],
  ],
  [
    [-5, -1],
    [-3, -1],
  ],
  [
    [-3, -1],
    [-1, -1],
  ],
  [
    [-1, -1],
    [-1, -3],
  ],
  [
    [-1, -3],
    [-1, -5],
  ],
];

/**
 * Takes 2 colors and returns an array of gradient stops between those colors.
 * Phase allows us to shift the gradient.
 * gradientWave() function is used to interpolate between colors.
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
      color1.red + (colorDelta.red * gradientWave(point, phase)),
      color1.green + (colorDelta.green * gradientWave(point, phase)),
      color1.blue + (colorDelta.blue * gradientWave(point, phase)),
    ]);
  });

  const xyPoints = xPoints.map((point, key) => [yPoints[key], point]);

  return new paper.Gradient(xyPoints);
}

class PoolAnimation {
  constructor(props) {
    this.paths = [null];
    this.layers = [null];
  }

  draw() {
    const POOL_PATH_SCALE = 50;

    POOL_PATHS.map((path, index) => {
      this.paths[index] = new paper.Path();
      this.paths[index].strokeWidth = 5;
      const point1 = [path[0][0] * POOL_PATH_SCALE, path[0][1] * POOL_PATH_SCALE];
      const point2 = [path[1][0] * POOL_PATH_SCALE, path[1][1] * POOL_PATH_SCALE];

      this.paths[index].add(point1);
      this.paths[index].add(point2);

      this.paths[index].strokeColor = 'black';
      this.paths[index].strokeCap = 'round';

      this.layers[0].addChild(this.paths[index]);
      return path;
    });

    this.color();
  }

  color(phase = 0) {
    this.paths.map((path, index) => {
      const startPoint = path.segments[0].curve.point1;
      const endPoint = path.segments[1].curve.point2;
      const generatedGradient = generateGradient(new paper.Color(COLORS.gray), new paper.Color(COLORS.purple), phase);
      const gradientColor = new paper.Color(generatedGradient, startPoint, endPoint);
      this.paths[index].strokeColor = gradientColor;
      return path;
    });
  }

  animate(event) {
    const {count} = event;
    const phase = (count % 100) / 100;
    this.color(phase);
  }
}

export default PoolAnimation;