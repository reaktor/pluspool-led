import paper from 'paper';
import {transforms} from '../../helpers/data';
import {COLORS} from './constants';
import {gradientWave} from './functions';

/**
 * Start from 12 o'clock and go clock wise
 */
const POOL_PATHS = [
  [[-1, -5], [1, -5]],
  [[1, -5], [1, -3]],
  [[1, -3], [1, -1]],
  [[1, -1], [5, -1]],
  [[5, -1], [5, 1]],
  [[5, 1], [1, 1]],
  [[1, 1], [1, 3]],
  [[1, 3], [1, 5]],
  [[1, 5], [-1, 5]],
  [[-1, 5], [-1, 3]],
  [[-1, 3], [-1, 1]],
  [[-1, 1], [-3, 1]],
  [[-3, 1], [-5, 1]],
  [[-5, 1], [-5, -1]],
  [[-5, -1], [-3, -1]],
  [[-3, -1], [-1, -1]],
  [[-1, -1], [-1, -3]],
  [[-1, -3], [-1, -5]],
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
      color1.red + colorDelta.red * gradientWave(point, phase),
      color1.green + colorDelta.green * gradientWave(point, phase),
      color1.blue + colorDelta.blue * gradientWave(point, phase),
    ]);
  });

  const xyPoints = xPoints.map((point, key) => [yPoints[key], point]);

  return new paper.Gradient(xyPoints);
};

const blend = (num1, num2, value) => (num2 - num1) * value + num1;

/**
 *
 * @param {First color} color1
 * @param {Second color} color2
 * @param {Blend value} value
 */
const blendColors = (color1, color2, value) => ({
  red: blend(color1.red, color2.red, value),
  green: blend(color1.green, color2.green, value),
  blue: blend(color1.blue, color2.blue, value),
});

class PoolAnimation {
  constructor(props) {
    const {sample} = props;
    this.sample = sample;
    this.paths = [null];
    this.layers = [null];
  }

  updateProps({sample}) {
    this.sample = sample;
  }

  draw() {
    const POOL_PATH_SCALE = 50;

    POOL_PATHS.map((path, index) => {
      this.paths[index] = new paper.Path();
      this.paths[index].strokeWidth = 5;
      const point1 = [
        path[0][0] * POOL_PATH_SCALE,
        path[0][1] * POOL_PATH_SCALE,
      ];
      const point2 = [
        path[1][0] * POOL_PATH_SCALE,
        path[1][1] * POOL_PATH_SCALE,
      ];

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
    const color1 = blendColors(
      new paper.Color(COLORS.gray),
      new paper.Color(COLORS.white),
      1
    );

    const color2 = blendColors(
      new paper.Color(COLORS.purple),
      new paper.Color(COLORS.yellow),
      transforms['Percent Oxygen_SDI_0_10_%'](
        this.sample['Percent Oxygen_SDI_0_10_%']
      )
    );

    this.paths.map((path, index) => {
      const startPoint = path.segments[0].curve.point1;
      const endPoint = path.segments[1].curve.point2;
      const generatedGradient = generateGradient(color1, color2, phase);
      const gradientColor = new paper.Color(
        generatedGradient,
        startPoint,
        endPoint
      );
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
