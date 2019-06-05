const labels = {
  'Percent Oxygen_SDI_0_10_%': 'Percent Oxygen',
  'Salinity_SDI_0_4_ppt': 'Salinity',
  'Turbidity_SDI_0_8_NTU': 'Turbidity',
};

const units = {
  'Percent Oxygen_SDI_0_10_%': '%',
  'Salinity_SDI_0_4_ppt': 'PPT',
  'Turbidity_SDI_0_8_NTU': 'NTU',
};

const scale = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

/**
 * `transforms` contains functions that will take a value from the data
 * and return a value mapped between 0 -> 1.
 */
const transforms = {
  'Percent Oxygen_SDI_0_10_%': value => scale(value, 0, 100, 0, 1),
  // bacteria: value => (value === 'high' ? 1 : 0),
};

export {labels, units, transforms};
