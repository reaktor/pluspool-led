const labels = {
  oxygen: 'Oxygen',
  bacteria: 'Bacteria',
};

const units = {
  oxygen: '%',
  bacteria: '',
};

const scale = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

/**
 * `transforms` contains functions that will take a value from the data
 * and return a value mapped between 0 -> 1.
 */
const transforms = {
  oxygen: value => scale(value, 20, 90, 0, 1),
  bacteria: value => (value === 'high' ? 1 : 0),
};

export {labels, units, transforms};
