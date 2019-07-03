import fetch from 'isomorphic-unfetch'
import { DIRECTIONS, ENDPOINTS } from './constants'
import dayjs from 'dayjs'

/**
 * Generate a timestamp in the past
 */
const before = unit => dayjs().subtract(1, unit).valueOf()

const dataValues = {
  bacteria: {
    column: 'bacteria',
    label: 'Bacteria',
    unit: 'MPN',
    description: (
      <p>While not generally harmful to humans, the presence of bacteria in the genus Enterococcus in a water body indicates possible fecal waste contamination. This waste is likely to contain pathogenic microbes and can cause disease in those using the water body directly (i.e. swimming) or indirectly (i.e. consuming marine life). The New York City Department of Health declares values under 35 Colony Forming Units (CFU) as acceptable, 35-104 CFU acceptable if transient, and greater than 104 CFU unacceptable. While the concentration of Enterococci generally takes 24 hours to be measured, we have developed a predictive algorithm based off highly correlated environmental parameters, such as precipitation, in order to present in real-time the probable concentration of Enterococci. Like the standard 24 hour measurement, this value is reported in Most Probable Number, or MPN.</p>
    ),
    legend: [
      {
        color: 'green',
        value: '<35 MPN',
        label: 'Acceptable'
      },
      {
        color: 'yellow',
        value: '35-104 MPN',
        label: 'Unacceptable if levels persist'
      },
      {
        color: 'red',
        value: '>104 MPN',
        label: 'Unacceptable'
      }
    ]
  },
  oxygen: {
    column: 'Percent Oxygen_SDI_0_10_%',
    label: 'Percent Oxygen',
    unit: '%',
    description: (
      <p>Dissolved oxygen is introduced into the water by photosynthetic organisms and air-water gas exchange, and is consumed during respiration. Levels are highest during daylight and drop during the night as there is no photosynthesis to counteract consumption. Just like on land, oxygen is critical for many species of marine life, and low levels (hypoxia or anoxia) will stress or even suffocate organisms, resulting in large die-offs. Oxygen levels are primarily controlled by biological production and consumption, temperature (higher temperature decreases the solubility), and the physical mixing.</p>
    ),
    normalize: value => scale(value, 0, 100, 0, 1)
  },
  salinity: {
    column: 'Salinity_SDI_0_4_ppt',
    label: 'Salinity',
    unit: 'PPT',
    description: (
      <p>Salinity is a measurement of dissolved salts in the water, and is calculated from a measurement of conductance. The Hudson River is a tidal estuary, so the salinity is controlled by the tides pulling freshwater south and saltwater north. Thus the salinity indicates the source of the water and can correlate with several other parameters.</p>
    )
  },
  turbidity: {
    column: 'Turbidity_SDI_0_8_NTU',
    label: 'Turbidity',
    unit: 'NTU',
    description: (
      <p>Turbidity is a measurement of the clarity of water, and thus is indicative of how many particles are suspended. Turbidity is important parameter of water quality because microbes and heavy metals may adhere to these particles. Additionally, the clarity of the water affects light penetration, habitat quality, and sedimentation rates.</p>
    )
  },
  speed: {
    column: 's',
    label: 'Water Speed',
    unit: 'KN',
    description: (
      <p>Salinity is a measurement of dissolved salts in the water, and is calculated from a measurement of conductance. The Hudson River is a tidal estuary, so the salinity is controlled by the tides pulling freshwater south and saltwater north. Thus the salinity indicates the source of the water and can correlate with several other parameters.</p>
    )
  },
  direction: {
    column: 'd',
    label: 'Water Direction',
    unit: '',
    description: (
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus purus, euismod aliquam lacinia sit amet, semper in nulla. Aliquam erat volutpat. Proin consequat dapibus magna sit amet feugiat. Integer ultrices feugiat urna, pellentesque sagittis ante suscipit at. Duis pellentesque erat vitae accumsan vulputate. Quisque urna neque, luctus sed sapien non, euismod pharetra felis. Sed gravida porttitor elit mattis vehicula. Aenean nec est commodo, viverra turpis efficitur, tincidunt leo.</p>
    ),
    transform: value => DIRECTIONS[Math.floor(value / 45)]
  },
  ph: {
    column: 'pH mV_SDI_0_7_V',
    label: 'pH',
    unit: 'pH',
    description: (
      <p>The pH refers to how acidic or basic a water body is. It is a critical component of water quality because the pH controls the solubility of minerals (including the shells of calcifying organisms) and the bioavailability of both nutrients and toxic compounds such as heavy metals. In general, lowering pH decreases environmental water quality, as heavy metals tend to become more soluble and marine organisms come under stress. There is a natural diel cycle in pH due to the increased release of acidic carbon dioxide during the night. Water temperature controls gas solubility, so colder temperatures can result in more uptake of carbon dioxide from the atmosphere and lower the pH as well.</p>
    )
  }
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
 * getSamples returns an array of samples
 * @param {Object} noaaData - raw noaaData
 * @param {Object} stationData - raw stationData
 *
 * @returns {Object} Array of samples
 */
const getSamples = ({ noaaData, stationData }) => {
  const start = Math.max(
    Date.parse(noaaData[0].t),
    stationData.samples[0][0]
  )
  const end = Math.min(
    Date.parse(noaaData[noaaData.length - 1].t),
    stationData.samples[stationData.samples.length - 2][0]
  )

  const startIndex = noaaData.findIndex(sample => Date.parse(sample.t) >= start)
  const reverseNoaaData = noaaData.slice().reverse()
  const endIndex = reverseNoaaData.length - reverseNoaaData.findIndex(sample => Date.parse(sample.t) <= end)

  const samplesInRange = noaaData.slice(startIndex, endIndex)

  const samples = samplesInRange.map(noaaSample => {
    const timestamp = Date.parse(noaaSample.t)
    const stationSample = deriveSampleFromStationData({ stationData, timestamp })
    return { ...noaaSample, ...stationSample }
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

  const sample = getStationSampleAtTimestamp({ stationData, timestamp })

  return stationData.header.reduce((acc, column, i) => {
    acc[column] = sample[i]
    return acc
  }, {})
}

const getStationSampleAtTimestamp = ({ stationData, timestamp }) => {
  const index = stationData.samples.findIndex(
    sample => sample[0] > timestamp
  ) - 1

  return stationData.samples[index] || {}
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
  dataValues,
  before,
  scale,
  getSamples,
  fetchStationData,
  fetchNoaaData
}
