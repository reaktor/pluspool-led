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
        <p>This is kind of a big one and why we put it first.  Bacteria, specifically “Enterococcus,” is the main factor that impacts whether or not it’s safe to swim in the water. The NYC Department of Health says its safe to swim when levels are under 35 Colony Forming Units (CFU). The problem is, current systems for testing the concentration of bacteria generally takes a 24 hours lab test. That's why we have developed a predictive algorithm with our friends at Columbia University based off highly correlated environmental parameters, such as precipitation, in order to present in real-time the probable concentration of Enterococci. Like the standard 24 hour lab measurement, this value is reported in Most Probable Number, or MPN.</p>
      </>
    ),
    interperet: value => {
      if (value < 35) return 'Good'
      if (value < 104) return 'Bad'
      return 'Ugly'
    },
    legend: [
      {
        value: 0,
        label: 'Good'
      },
      {
        color: '#DB2B2B',
        value: 35,
        label: 'Bad'
      },
      {
        color: '#DB2B2B',
        value: 104,
        label: 'Ugly'
      }
    ]
  },
  oxygen: {
    slug: 'oxygen',
    color: '#1443A7',
    label: 'Oxygen',
    description: (
      <p>Just like the air we breath on land, oxygen supports life in the water. This parameter gets its clever name, Dissolved Oxygen, because oxygen makes its way into the water from the air, or its produced by underwater plants and dissolves in water. Levels tend to be highest during daylight (when plants and animals use it to breath) and drop during the night (when there’s no photosynthesis to counteract consumption).</p>
    ),
    interperet: () => 'Normal',
    legend: [
      {
        value: '0%'
      },
      {
        value: '100%'
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
      {        color: '#0000CC',
        value: -50,
        label: 'Hypothermia'
      },
      {
        value: 60,
        label: 'Chilly'
      },
      {
        value: 70,
        label: 'Perfect'
      },
      {
        value: 80,
        label: 'Warm'
      }
    ]
  },
  salinity: {
    slug: 'salinity',
    color: '#009247',
    label: 'Salinity',
    description: (
      <p>Some water has salt, some water is fresh. In the East River, its a little bit of both!  Salinity changes often in NYC because the river is actually an estuary, where salt water (coming in from the ocean) and fresh water (coming down from Upstate) mix together. Thats why when the water is flowing north there tends to be a higher level of salinity and when the water is flowing south, salinity tends to be lower.</p>
    ),
    interperet: value => {
      if (value < 10) return 'Salty'
      return 'Stings'
    },
    legend: [
      {
        value: 0,
        label: 'Salty'
      },
      {
        value: 10,
        label: 'Stings'
      }
    ]
  },
  turbidity: {
    slug: 'turbidity',
    color: '#0DB3A6',
    label: 'Turbidity',
    description: (
      <p>We track turbidity to to see how much funk is in the water.  Funk can take the form of floating particles like clay, silt, algae, or sewage. This might be obvious, but generally, clear water is healthier than murky or opaque water. More floating particles equals greater turbidity.  [NEW PARAGRAPH] Turbidity is a pretty unique water quality parameter in that its a visible - you can see with your eyes if water has high turbidity or low turbidity, unlike other parameters, such as oxygen. But we still measure it in what's called NTU, which stands for Nephelometric Turbidity Units simply because the instrument used for measuring it is called a nephelometer. This instrument traces the amount of light that can penetrate through the water.  More light means turbidity is low. And less light? More funk.  </p>
    ),
    interperet: value => {
      if (value < 300) return 'Clear'
      if (value < 750) return 'Murky'
      return 'Opaque'
    },
    legend: [
      {        value: 0,
        label: 'Clear'
      },
      {        value: 300,
        label: 'Murky'
      },
      {        value: 750,
        label: 'Opaque'
      }
    ]
  },
  speed: {
    slug: 'speed',
    label: 'Speed',
    description: (
      <p>Speed effects how fast (or how slow!) an area of water changes. Not related to the Keanue Reeves film(s).</p>
    ),
    interperet: value => {
      if (value < 0.5) return 'Still'
      if (value < 1) return 'Moving'
      return 'Fast'
    },
    legend: [
      {
        value: 0,
        label: 'Still'
      },
      {
        value: 0.5,
        label: 'Moving'
      },
      {
        color: '#DB2B2B',
        value: 1.5,
        label: 'Fast'
      }
    ]
  },
  direction: {
    slug: 'direction',
    label: 'Direction',
    description: (
      <p>Due to the tides coming in and going out from the ocean, the East River runs north for six hours and then runs south for six hours. Pretty cool.</p>
    ),
    interperet: value => DIRECTIONS[Math.floor(value / 45)],
    legend: [...DIRECTIONS, DIRECTIONS[DIRECTIONS.length - 1]].map((label, index) => ({
      value: index * 45,
      label
    }))
  },
  ph: {
    slug: 'ph',
    color: '#592150',
    label: 'pH',
    description: (
      <p>pH tells us whether water is acidic or basic. For good water quality, we don't want pH to be too high or too low. pH is effected by all kinds of things, including rain and snow, which tend to be acidic. Wetlands and marshes tend to help keep pH balanced.</p>
    ),
    interperet: value => {
      if (value < 6) return 'Acidic'
      if (value > 7) return 'Basic'
      return 'Neutral'
    },
    max: 14,
    legend: [
      {
        value: 0,
        label: 'Acidic'
      },
      {
        value: 6,
        label: 'Neutral'
      },
      {
        value: 7,
        label: 'Basic'
      }
    ]
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
        value: 0,
        label: 'Low'
      },
      {
        value: 3.2,
        label: 'High'
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
