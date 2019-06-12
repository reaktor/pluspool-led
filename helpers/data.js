import fetch from 'isomorphic-unfetch';
import {DIRECTIONS, ENDPOINTS} from './constants';

/**
 * Look up table that takes our data header as the key
 * and returns a human readible label.
 */
const labels = {
  'Percent Oxygen_SDI_0_10_%': 'Percent Oxygen',
  // prettier-ignore
  'Salinity_SDI_0_4_ppt': 'Salinity',
  // prettier-ignore
  'Turbidity_SDI_0_8_NTU': 'Turbidity',
  s: 'Water Speed',
  d: 'Water Direction',
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
  'Turbidity_SDI_0_8_NTU': 'NTU',
  s: 'KN',
  d: '',
};

/**
 * Look up table that takes our data header as the key
 * and returns a function that takes the value and returns a new value.
 */
const transforms = {
  d: value => DIRECTIONS[Math.floor(value / 45)],
};

/**
 *
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
 * @return {number} the scaled numbmer
 */

// eslint-disable-next-line max-params
const scale = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

/**
 * `normalizations` contains functions that will take a value from the data
 * and return a value mapped between 0 -> 1.
 */
const normalizations = {
  'Percent Oxygen_SDI_0_10_%': value => scale(value, 0, 100, 0, 1),
};

/**
 *
 * @param {Object} props - Props we pass to all derive data functions.
 * @returns {Object} The merged data from all sources.
 */
const deriveSampleFromData = props => {
  const stationDataSample = deriveSampleFromStationData(props);
  const noaaDataSample = deriveSampleFromNoaaData(props);

  return {
    ...stationDataSample,
    ...noaaDataSample,
  };
};

/**
 *
 * @param {Object} stationData - Data retrieved from the Datagarrison weather station.
 * @param {Array} stationData.header - A list of labels for each column of data.
 * @param {Array} stationData.samples - The data samples.
 * @param {string} stationData.timezone - Timezone for data
 * @param {number} stationSampleIndex - Temporary index for which sample to grab.
 * @returns {Object} A sample of data.
 */
const deriveSampleFromStationData = ({stationData, stationSampleIndex}) => {
  if (stationData && stationData.samples && stationSampleIndex) {
    const sample = stationData.samples[stationSampleIndex];
    return stationData.header.reduce((acc, column, i) => {
      acc[column] = sample[i];
      return acc;
    }, {});
  }

  return {};
};

/**
 *
 * @param {Object} stationData - Data retrieved from the Datagarrison weather station.
 * @param {Array} stationData.header - A list of labels for each column of data.
 * @param {Array} stationData.samples - The data samples.
 * @param {string} stationData.timezone - Timezone for data
 * @returns {Object} Samples of data.
 */
const deriveSamplesFromStationData = ({stationData}) => {
  if (stationData && stationData.samples) {
    return stationData.samples.map(sample => {
      return stationData.header.reduce((acc, column, i) => {
        acc[column] = sample[i];
        return acc;
      }, {});
    });
  }

  return {};
};

/**
 *
 * @param {Object} noaaData - Data retrieved from the NOAA tides and currents api.
 * @param {number} noaaSampleIndex - Temporary index for which sample to grab.
 * @returns {Object} A sample of data.
 */
const deriveSampleFromNoaaData = ({noaaData, noaaSampleIndex}) => {
  if (noaaData && noaaData.length > 0 && noaaSampleIndex) {
    const noaaSample = noaaData[noaaSampleIndex];
    return noaaSample;
  }

  return {};
};

const fetchStationData = () => {
  return fetch(ENDPOINTS.datagarrison, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain',
    },
  }).then(response => {
    if (response.ok) {
      return response.text();
    }

    throw new Error(`Request rejected with status ${response.status}`);
  });
};

const fetchNoaaData = () => {
  return fetch(ENDPOINTS.noaaCurrent, {
    method: 'GET',
  }).then(response => {
    return response.json();
  });
};

export {
  labels,
  units,
  normalizations,
  transforms,
  deriveSampleFromData,
  deriveSamplesFromStationData,
  fetchStationData,
  fetchNoaaData,
};
