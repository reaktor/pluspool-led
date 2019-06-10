import paper from 'paper';
import {transforms} from '../../helpers/data';
import {COLORS} from '../../helpers/constants';
import {gradientWave} from '../../helpers/functions';

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
 * @param {paper.Color} from starting color
 * @param {paper.Color} to ending color
 * @param {number} phase how quickly to blend
 * @returns {paper.Gradient} a bunch of colors
 */
const generateGradient = (from, to, phase) => {
  const colorDelta = {
    red: to.red - from.red,
    green: to.green - from.green,
    blue: to.blue - from.blue,
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
      from.red + colorDelta.red * gradientWave(point, phase),
      from.green + colorDelta.green * gradientWave(point, phase),
      from.blue + colorDelta.blue * gradientWave(point, phase),
    ]);
  });

  const xyPoints = xPoints.map((point, key) => [yPoints[key], point]);

  return new paper.Gradient(xyPoints);
};

const blend = (num1, num2, value) => (num2 - num1) * value + num1;

/*
 * Blend two colors into a single color
 * @param {First color} from color to blend from
 * @param {Second color} to color to blend to
 * @param {Blend value} value how much to blend (0-1)
 */
const blendColors = (from, to, value) => ({
  red: blend(from.red, to.red, value),
  green: blend(from.green, to.green, value),
  blue: blend(from.blue, to.blue, value),
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
  }

  color(phase = 0) {
    if (!this.sample) return;
    const from = blendColors(
      new paper.Color(COLORS.gray),
      new paper.Color(COLORS.white),
      1
    );

    const to = blendColors(
      new paper.Color(COLORS.purple),
      new paper.Color(COLORS.yellow),
      // eslint-disable-next-line new-cap
      transforms['Percent Oxygen_SDI_0_10_%'](
        this.sample['Percent Oxygen_SDI_0_10_%']
      )
    );

    this.paths.map((path, index) => {
      const startPoint = path.segments[0].curve.point1;
      const endPoint = path.segments[1].curve.point2;
      const generatedGradient = generateGradient(from, to, phase);
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
