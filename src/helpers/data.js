import {ENDPOINTS} from './constants';

/**
 * Look up table that takes our data header as the key
 * and returns a human readible label.
 */
const labels = {
  'Percent Oxygen_SDI_0_10_%': 'Percent Oxygen',
  // prettier-ignore
  'Salinity_SDI_0_4_ppt': 'Salinity',
  // prettier-ignore
  'Turbidity_SDI_0_8_NTU': 'Turbidity'
};

/**
 * Look up table that takes our data header as the key
 * and returns a human readible unit.
 */
const units = {
  'Percent Oxygen_SDI_0_10_%': '%',
  // prettier-ignore
  'Salinity_SDI_0_4_ppt': 'PPT',
  // prettier-ignore
  'Turbidity_SDI_0_8_NTU': 'NTU'
};

/**
 * A function that allows us to take a number and an initial range
 * and remap that number to a new range.
 *
 * @example
 *
 * // returns 5
 * scale(0.5, 0, 1, 0, 10)
 *
 * // returns 150
 * scale(50, 0, 100, 100, 200)
 *
 * @param {number} num - The input number
 * @param {number} inMin - The low end value for the scale that `num` is originally mapped to.
 * @param {number} inMax - The high end value for the scale that `num` is originally mapped to.
 * @param {number} outMin - The low end value for the scale that `num` will be mapped to.
 * @param {number} outMax - The high end value for the scale that `num` will be mapped to.
 */
const scale = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

/**
 * `transforms` contains functions that will take a value from the data
 * and return a value mapped between 0 -> 1.
 */
const transforms = {
  'Percent Oxygen_SDI_0_10_%': value => scale(value, 0, 100, 0, 1),
};

/**
 *
 * @param {Object} data
 * @param {Array} data.header
 * @param {Array} data.samples
 * @param {string} data.timezone
 * @param {number} index
 */
const getSampleFromData = (data, index) => {
  if (data && data.samples) {
    const sample = data.samples[index];
    return data.header.reduce((acc, column, i) => {
      acc[column] = sample[i];
      return acc;
    }, {});
  }

  return {};
};

const fetchDataGarrisonData = () => {
  return fetch(ENDPOINTS.datagarrison, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain',
    },
  }).then(response => {
    return response.text();
  });
};

export {labels, units, transforms, getSampleFromData, fetchDataGarrisonData};
