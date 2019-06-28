import fetch from 'isomorphic-unfetch'
import { DIRECTIONS, ENDPOINTS } from './constants'
import dayjs from 'dayjs'

/**
 * Generate a timestamp in the past
 */
const before = unit => dayjs().subtract(1, unit).valueOf()

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
  d: 'Water Direction'
}

/**
 * Look up table that takes our data header as the key
 * and returns a slug that can be used in other places.
 */
const slug = {
  'Percent Oxygen_SDI_0_10_%': 'oxygen',
  // prettier-ignore
  'Salinity_SDI_0_4_ppt': 'salinity',
  // prettier-ignore
  'Turbidity_SDI_0_8_NTU': 'turbidity',
  s: 'speed',
  d: 'direction'
}

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
  d: ''
}

/**
 * Look up table that takes our data header as the key
 * and returns a function that takes the value and returns a new value.
 */
const transforms = {
  d: value => DIRECTIONS[Math.floor(value / 45)]
}

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

const scale = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin

/**
 * `normalizations` contains functions that will take a value from the data
 * and return a value mapped between 0 -> 1.
 */
const normalizations = {
  'Percent Oxygen_SDI_0_10_%': value => scale(value, 0, 100, 0, 1)
}

/**
 * GetSamples returns an array of samples
 * @param {Object} noaaData - raw noaaData
 * @param {Object} stationData - raw stationData
 *
 * @returns {Object} Array of samples
 */
const getSamples = ({ noaaData, stationData }) => {
  const start = Math.max(Date.parse(noaaData[0].t), stationData.samples[0][0])
  const end = Math.min(
    Date.parse(noaaData[noaaData.length - 1].t),
    stationData.samples[stationData.samples.length - 2][0]
  )

  const startIndex = noaaData.findIndex(sample => Date.parse(sample.t) >= start)

  const data = noaaData.slice()
  data.reverse()
  const endIndex = data.length - data.findIndex(sample => Date.parse(sample.t) <= end)

  const samples = noaaData.slice(startIndex, endIndex + 1)
    .map(sample => {
      const timestamp = Date.parse(sample.t)
      const stationSample = deriveSampleFromStationData({ stationData, timestamp })
      return { ...sample, ...stationSample }
    })

  return samples
}

/**
 *
 * @param {Object} stationData - Data retrieved from the Datagarrison weather station.
 * @param {Array} stationData.header - A list of labels for each column of data.
 * @param {Array} stationData.samples - The data samples.
 * @param {string} stationData.timezone - Timezone for data
 * @param {number} stationSampleIndex - Temporary index for which sample to grab.
 * @returns {Object} A sample of data.
 */
const deriveSampleFromStationData = ({ stationData, timestamp }) => {
  if (!timestamp || !stationData || !stationData.samples) return {}

  const index = stationData.samples.findIndex(
    sample => sample[0] >= timestamp
  )

  if (index - 1 < 0) return {}
  const sample = stationData.samples[index - 1]

  return stationData.header.reduce((acc, column, i) => {
    acc[column] = sample[i]
    return acc
  }, {})
}

const fetchStationData = () => {
  return fetch(ENDPOINTS.datagarrison).then(response => {
    if (response.ok) {
      return response.text()
    }
    throw new Error(`Request rejected with status ${response.status}`)
  })
}

const fetchNoaaData = () => {
  return fetch(ENDPOINTS.noaaCurrent, {
    method: 'GET'
  }).then(response => {
    return response.json()
  })
}

export {
  labels,
  units,
  slug,
  before,
  normalizations,
  transforms,
  scale,
  getSamples,
  fetchStationData,
  fetchNoaaData
}
