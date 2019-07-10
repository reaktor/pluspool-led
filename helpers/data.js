import fetch from 'isomorphic-unfetch'
import { DIRECTIONS, ENDPOINTS } from './constants'
import dayjs from 'dayjs'

/**
 * Generate a timestamp in the past
 */
const before = unit => dayjs().subtract(1, unit).valueOf()

const dataValues = {
  bacteria: {
    slug: 'bacteria',
    color: '#DB2B2B',
    label: 'Bacteria',
    unit: 'MPN',
    description: (
      <>
        <p>While not generally harmful to humans, the presence of bacteria in the genus Enterococcus in a water body indicates possible fecal waste contamination. This waste is likely to contain pathogenic microbes and can cause disease in those using the water body directly (i.e. swimming) or indirectly (i.e. consuming marine life). The New York City Department of Health declares values under 35 Colony Forming Units (CFU) as acceptable, 35-104 CFU acceptable if transient, and greater than 104 CFU unacceptable.</p>
        <p>While the concentration of Enterococci generally takes 24 hours to be measured, we have developed a predictive algorithm based off highly correlated environmental parameters, such as precipitation, in order to present in real-time the probable concentration of Enterococci. Like the standard 24 hour measurement, this value is reported in Most Probable Number, or MPN.</p>
      </>
    ),
    legend: [
      {
        color: '#000000',
        value: 0,
        label: 'Acceptable'
      },
      {
        color: '#DB2B2B',
        value: 35,
        label: 'Unacceptable if levels persist'
      },
      {
        color: '#DB2B2B',
        value: 104,
        label: 'Unacceptable'
      },
      {
        color: '#DB2B2B',
        value: '+104'
      }
    ]
  },
  oxygen: {
    slug: 'oxygen',
    color: '#1443A7',
    label: 'Percent Oxygen',
    unit: '%',
    description: (
      <p>Dissolved oxygen is introduced into the water by photosynthetic organisms and air-water gas exchange, and is consumed during respiration. Levels are highest during daylight and drop during the night as there is no photosynthesis to counteract consumption. Just like on land, oxygen is critical for many species of marine life, and low levels (hypoxia or anoxia) will stress or even suffocate organisms, resulting in large die-offs. Oxygen levels are primarily controlled by biological production and consumption, temperature (higher temperature decreases the solubility), and the physical mixing.</p>
    )
  },
  salinity: {
    slug: 'salinity',
    color: '#009247',
    label: 'Salinity',
    unit: 'PPT',
    description: (
      <p>Salinity is a measurement of dissolved salts in the water, and is calculated from a measurement of conductance. The Hudson River is a tidal estuary, so the salinity is controlled by the tides pulling freshwater south and saltwater north. Thus the salinity indicates the source of the water and can correlate with several other parameters.</p>
    )
  },
  turbidity: {
    slug: 'turbidity',
    color: '#592150',
    label: 'Turbidity',
    unit: 'NTU',
    description: (
      <p>Turbidity is a measurement of the clarity of water, and thus is indicative of how many particles are suspended. Turbidity is important parameter of water quality because microbes and heavy metals may adhere to these particles. Additionally, the clarity of the water affects light penetration, habitat quality, and sedimentation rates.</p>
    )
  },
  speed: {
    slug: 'speed',
    color: '#F2BAD2',
    label: 'Water Speed',
    unit: 'KN',
    description: (
      <p>Salinity is a measurement of dissolved salts in the water, and is calculated from a measurement of conductance. The Hudson River is a tidal estuary, so the salinity is controlled by the tides pulling freshwater south and saltwater north. Thus the salinity indicates the source of the water and can correlate with several other parameters.</p>
    )
  },
  direction: {
    slug: 'direction',
    color: '#000000',
    label: 'Water Direction',
    unit: '',
    description: (
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus purus, euismod aliquam lacinia sit amet, semper in nulla. Aliquam erat volutpat. Proin consequat dapibus magna sit amet feugiat. Integer ultrices feugiat urna, pellentesque sagittis ante suscipit at. Duis pellentesque erat vitae accumsan vulputate. Quisque urna neque, luctus sed sapien non, euismod pharetra felis. Sed gravida porttitor elit mattis vehicula. Aenean nec est commodo, viverra turpis efficitur, tincidunt leo.</p>
    ),
    transform: value => DIRECTIONS[Math.floor(value / 45)]
  },
  ph: {
    slug: 'ph',
    color: '#0DB3A6',
    label: 'pH',
    unit: 'pH',
    description: (
      <p>The pH refers to how acidic or basic a water body is. It is a critical component of water quality because the pH controls the solubility of minerals (including the shells of calcifying organisms) and the bioavailability of both nutrients and toxic compounds such as heavy metals. In general, lowering pH decreases environmental water quality, as heavy metals tend to become more soluble and marine organisms come under stress. There is a natural diel cycle in pH due to the increased release of acidic carbon dioxide during the night. Water temperature controls gas solubility, so colder temperatures can result in more uptake of carbon dioxide from the atmosphere and lower the pH as well.</p>
    ),
    transform: value => scale(value, -400, 400, 0, 14).toFixed(2)
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

const fetchSamplesData = () => {
  return fetch(ENDPOINTS.samples, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    referrer: 'no-referrer'
  })
    .then(response => {
      if (response.ok) return response.json()
      throw new Error(`Request rejected with status ${response.status}`)
    })
    .then(json => {
      if (!json.version) return { samples: json }
      return json
    })
}

export {
  dataValues,
  before,
  scale,
  fetchSamplesData
}
