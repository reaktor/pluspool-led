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
 * GetSampleAtTimestamp is actually a react-style reducer.
 * It takes the previous and current state and
 * @param {Object} previousState - unused but maybe useful in the future
 * @param {Object} currentState - all sample data we know about plus a timestamp.
 * @returns {Object} The merged data from all sources.
 */
const getSampleAtTimestamp = (
  previousState,
  {noaaData, stationData, timestamp}
) => {
  const stationSample = deriveSampleFromStationData({stationData, timestamp});
  const noaaSample = deriveSampleFromNoaaData({noaaData, timestamp});
  const sample = {...stationSample, ...noaaSample};
  return sample;
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
const deriveSampleFromStationData = ({stationData, timestamp}) => {
  if (stationData && stationData.samples && timestamp) {
    const index = stationData.samples.findIndex(
      sample => sample[0] >= timestamp
    );

    if (index - 1 < 0) return {};
    const sample = stationData.samples[index - 1];

    return stationData.header.reduce((acc, column, i) => {
      acc[column] = sample[i];
      return acc;
    }, {});
  }

  return {};
};

/**
 *
 * @param {Object} noaaData - Data retrieved from the NOAA tides and currents api.
 * @param {number} timestamp - timestamp.
 * @returns {Object} A sample of data.
 */
const deriveSampleFromNoaaData = ({noaaData, timestamp}) => {
  if (noaaData && noaaData.length > 0 && timestamp) {
    const index = noaaData.findIndex(
      sample => Date.parse(sample.t) >= timestamp
    );
    if (index - 1 < 0) return {};
    return noaaData[index - 1];
  }

  return {};
};

/**
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

/**
 * Takes two range objects and returns their intersection
 * 
 * @param {start: timestamp, end: timestamp} range - first range to constrain by 
 * @param {start: timestamp, end: timestamp} by -  second range to constain by
 */
const constrain = (range, by) => ({
  start: Math.max(range.start, by.start),
  end: Math.min(range.end, by.end),
});

export {
  constrain,
  labels,
  units,
  normalizations,
  transforms,
  getSampleAtTimestamp,
  deriveSamplesFromStationData,
  fetchStationData,
  fetchNoaaData,
};
