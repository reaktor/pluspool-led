import { DIRECTIONS } from './constants'
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
    description: (
      <>
        <p>While not generally harmful to humans, the presence of bacteria in the genus Enterococcus in a water body indicates possible fecal waste contamination. This waste is likely to contain pathogenic microbes and can cause disease in those using the water body directly (i.e. swimming) or indirectly (i.e. consuming marine life). The New York City Department of Health declares values under 35 Colony Forming Units (CFU) as acceptable, 35-104 CFU acceptable if transient, and greater than 104 CFU unacceptable.</p>
        <p>While the concentration of Enterococci generally takes 24 hours to be measured, we have developed a predictive algorithm based off highly correlated environmental parameters, such as precipitation, in order to present in real-time the probable concentration of Enterococci. Like the standard 24 hour measurement, this value is reported in Most Probable Number, or MPN.</p>
      </>
    ),
    interperet: value => {
      if (value < 35) return 'Low'
      if (value < 104) return 'Medium'
      return 'High'
    },
    legend: [
      {
        color: '#000000',
        value: 0,
        label: 'EPA Safe'
      },
      {
        color: '#DB2B2B',
        value: 35,
        label: 'EPA Unsafe'
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
    label: 'Oxygen',
    description: (
      <p>Dissolved oxygen is introduced into the water by photosynthetic organisms and air-water gas exchange, and is consumed during respiration. Levels are highest during daylight and drop during the night as there is no photosynthesis to counteract consumption. Just like on land, oxygen is critical for many species of marine life, and low levels (hypoxia or anoxia) will stress or even suffocate organisms, resulting in large die-offs. Oxygen levels are primarily controlled by biological production and consumption, temperature (higher temperature decreases the solubility), and the physical mixing.</p>
    ),
    interperet: () => 'Normal',
    legend: [
      {
        color: '#000000',
        value: '0%'
      },
      {
        color: '#000000',
        value: '100%'
      }
    ]
  },
  salinity: {
    slug: 'salinity',
    color: '#009247',
    label: 'Salinity',
    description: (
      <p>Salinity is a measurement of dissolved salts in the water, and is calculated from a measurement of conductance. The Hudson River is a tidal estuary, so the salinity is controlled by the tides pulling freshwater south and saltwater north. Thus the salinity indicates the source of the water and can correlate with several other parameters.</p>
    ),
    interperet: value => {
      if (value < 5) return 'Drinkable'
      if (value < 10) return 'Salty'
      return 'Burns'
    },
    legend: [
      {
        color: '#000000',
        value: 5,
        label: 'drinkable but gross'
      },
      {
        color: '#000000',
        value: 10,
        label: 'like a ritz cracker'
      },
      {
        color: '#000000',
        value: 15,
        label: 'would burn any scrape'
      },
      {
        color: '#000000',
        value: '15+'
      }
    ]
  },
  temperature: {
    slug: 'temperature',
    color: '#A71443',
    label: 'Temperature',
    description: (
      <p>When you're hot you're hot, and look at what you got. Also under 60F puts most people at risk of hypothermia.</p>
    ),
    interperet: (value) => {
      if (value < 60) return 'Hypothermia'
      if (value < 70) return 'Chilly'
      if (value < 80) return 'Perfect'
      return 'Warm'
    },
    legend: [
      {
        color: '#0000CC',
        value: '50-',
        label: 'Risk of hypothermia'
      },
      {
        color: '#000000',
        value: 60,
        label: 'Chilly'
      },
      {
        color: '#000000',
        value: 70,
        label: 'Perfect'
      },
      {
        color: '#000000',
        value: 80,
        label: 'Hot!'
      },
      {
        color: '#000000',
        value: '90+'
      }
    ]
  },
  salinity: {
    slug: 'salinity',
    color: '#009247',
    label: 'Salinity',
    description: (
      <p>Salinity is a measurement of dissolved salts in the water, and is calculated from a measurement of conductance. The Hudson River is a tidal estuary, so the salinity is controlled by the tides pulling freshwater south and saltwater north. Thus the salinity indicates the source of the water and can correlate with several other parameters.</p>
    ),
    interperet: value => {
      if (value < 5) return 'Drinkable'
      if (value < 10) return 'Salty'
      return 'Burns'
    },
    legend: [
      {
        color: '#000000',
        value: 5,
        label: 'drinkable but gross'
      },
      {
        color: '#000000',
        value: 10,
        label: 'like a ritz cracker'
      },
      {
        color: '#000000',
        value: 15,
        label: 'would burn any scrape'
      },
      {
        color: '#000000',
        value: '15+'
      }
    ]
  },
  turbidity: {
    slug: 'turbidity',
    color: '#0DB3A6',
    label: 'Turbidity',
    description: (
      <p>Turbidity is a measurement of the clarity of water, and thus is indicative of how many particles are suspended. Turbidity is important parameter of water quality because microbes and heavy metals may adhere to these particles. Additionally, the clarity of the water affects light penetration, habitat quality, and sedimentation rates.</p>
    ),
    interperet: value => {
      if (value < 300) return 'Clear'
      if (value < 750) return 'Murky'
      return 'Opaque'
    },
    legend: [
      {
        color: '#000000',
        value: 0,
        label: 'Clear'
      },
      {
        color: '#000000',
        value: 300,
        label: 'Murky'
      },
      {
        color: '#000000',
        value: 750,
        label: 'Opaque'
      },
      {
        color: '#000000',
        value: '1000+'
      }
    ]
  },
  speed: {
    slug: 'speed',
    label: 'Speed',
    description: (
      <p>Salinity is a measurement of dissolved salts in the water, and is calculated from a measurement of conductance. The Hudson River is a tidal estuary, so the salinity is controlled by the tides pulling freshwater south and saltwater north. Thus the salinity indicates the source of the water and can correlate with several other parameters.</p>
    ),
    interperet: value => {
      if (value < 0.5) return 'Still'
      if (value < 1) return 'Moving'
      return 'Fast'
    },
    legend: [
      {
        color: '#000000',
        value: 0,
        label: 'Still'
      },
      {
        color: '#000000',
        value: 0.5,
        label: 'Moving'
      },
      {
        color: '#DB2B2B',
        value: '1.5',
        label: 'Fast'
      },
      {
        color: '#DB2B2B',
        value: '2.0+'
      }
    ]
  },
  direction: {
    slug: 'direction',
    label: 'Direction',
    description: (
      <p>Which compass direction is the water flowing? For Pier 17, inbound would be westward and outbount would be eastward.</p>
    ),
    interperet: value => DIRECTIONS[Math.floor(value / 45)],
    legend: [...DIRECTIONS, DIRECTIONS[DIRECTIONS.length - 1]].map((label, index) => ({
      color: '#000000',
      value: index * 45,
      label
    }))
  },
  ph: {
    slug: 'ph',
    color: '#592150',
    label: 'pH',
    description: (
      <p>The pH refers to how acidic or basic a water body is. It is a critical component of water quality because the pH controls the solubility of minerals (including the shells of calcifying organisms) and the bioavailability of both nutrients and toxic compounds such as heavy metals. In general, lowering pH decreases environmental water quality, as heavy metals tend to become more soluble and marine organisms come under stress. There is a natural diel cycle in pH due to the increased release of acidic carbon dioxide during the night. Water temperature controls gas solubility, so colder temperatures can result in more uptake of carbon dioxide from the atmosphere and lower the pH as well.</p>
    ),
    interperet: value => {
      if (value < 6) return 'Acidic'
      if (value > 7) return 'Basic'
      return 'Neutral'
    }
  },
  depth: {
    slug: 'depth',
    label: 'Tide',
    description: (
      <p>Depth shows the tides. The Hudson River Estuary is a strongly tidal system which is measured through a depth sensor on water quality sond.</p>
    ),
    interperet: value => {
      if (value < 3.2) return 'Low'
      return 'High'
    },
    legend: [
      {
        color: '#000000',
        value: 0,
        label: 'Low Tide'
      },
      {
        color: '#000000',
        value: 3.2,
        label: 'High Tide'
      },
      {
        color: '#000000',
        value: '4+'
      }
    ]
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
 *
 * A function that cuts a data series to points where 'index' is between
 * 'min' and 'max'.
 *
 * @param {[object]} data - The input data series
 * @param {string} index - The field in the data series objects used for filtering
 * @param {any} min - The minimum included index value
 * @param {any} max - The maximum included index value
 * @return {[object]} the cut data series
 */
const cutData = (data, index, min, max) =>
  min > max ? [] : data.filter(d => d[index] >= min && d[index] <= max)

/**
 *
 * Downsamples ordered data across a collection of numerical columns.
 * Averages downsampled values.
 *
 * @param {[object]} data - The ordered input data series
 * @param {string} index - The field in the data series objects used for filtering
 * @param {[string]} columns - The columns to downsample into the output
 * @param {number} resolution - The maxium length of the downsampled data
 * @return {[object]} the downsampled data series
 */
const downsampleData = (data, index, columns, resolution) => {
  const dsFactor = Math.ceil(data.length / resolution)

  if (data.length < 2 || dsFactor <= 1) return data

  const averagedData = []
  let sampleCounter = 0
  let indexValue = data[0][index]
  const accumulator = {}
  for (const name of columns) { accumulator[name] = 0 }

  for (const datum of data) {
    for (const name of columns) { accumulator[name] += datum[name] } // switch from += to = to sample instead of average
    sampleCounter += 1
    if (sampleCounter >= dsFactor) {
      for (const name of columns) { accumulator[name] /= sampleCounter } // comment out to sample instead of average

      averagedData.push({ [index]: indexValue, ...accumulator })

      sampleCounter = 0
      indexValue = datum[index]
      for (const name of columns) { accumulator[name] = 0 }
    }
  }

  return averagedData
}

const formXYSeries = (data, xColumn, yColumn) =>
  data.map(datum => ({ x: datum[xColumn], y: datum[yColumn] || null }))

export {
  dataValues,
  before,
  scale,
  cutData,
  downsampleData,
  formXYSeries
}
