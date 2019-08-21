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
        value: 35,
        label: 'Bad'
      },
      {
        value: 104,
        label: 'Ugly'
      }
    ]
  },
  oxygen: {
    slug: 'oxygen',
    color: '#1443A7',
    label: 'Oxygen',
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
    interperet: (value) => {
      if (value < 60) return 'Hypothermia'
      if (value < 70) return 'Chilly'
      if (value < 80) return 'Perfect'
      return 'Warm'
    },
    legend: [
      {
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
        value: 1.5,
        label: 'Fast'
      }
    ]
  },
  direction: {
    slug: 'direction',
    label: 'Direction',
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
