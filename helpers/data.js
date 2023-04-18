import dayjs from 'dayjs'
import { useState } from 'react';
import content from '../content';

/**
 * Generate a timestamp in the past
 */
const before = (unit, date = Date.now()) => dayjs(date).subtract(1, unit).valueOf()

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

/**
 * Forms the axes series for use in the line chart
 * @param {[object]} data
 * @param {string} column
 * @return {[*]} an array of values from the given column
 */
const formAxesSeries = (data, column) => {
  const series = data.map(datum => datum[column])
  return series
}

/**
 *
 * Formats the timestamp to a specified date format
 * @example
 *
 * // returns Apr 29, 2020
 * formatTimeStamp(1588140000000)
 *
 * // returns Apr 29 20 05:30 PM
 * formatTimeStamp(1588203000000, 'MMM D YY hh:mm A')
 *
 * @param {number} timestamp - timestamp to be formatted
 * @param {string} [format=MMM D, YYYY] - string defining the format
 * @return {string} Formatted timestamp
 */
const formatTimeStamp = (timestamp, format) => dayjs(timestamp).format(format || 'MMM D, YYYY')



const downSampleDataForDateRange = (latestTimeStamp, dateRangeUnit, samples, maxResolution = 1000) => {
  // const [domain, setDomain] = useState([latestSampleTimestamp, before(activeDateFilter, latestSampleTimestamp)])
  const dsColumns = Array.from(Object.keys(content.dataPoints))
  const domain = [latestTimeStamp, before(dateRangeUnit, latestTimeStamp)]

  // const setSpan = unit => setDomain([latestSampleTimestamp, before(unit, latestSampleTimestamp)])
  // const filterOnClick = unit => {
  //   setActiveDateFilter(unit)
  //   setSpan(unit)
  // }

  const [max, min] = domain

  const domainSamples = cutData(samples, 'noaaTime', min, max)
  return downsampleData(domainSamples, 'noaaTime', dsColumns, maxResolution)
}

export {
  before,
  scale,
  cutData,
  downsampleData,
  formAxesSeries,
  formatTimeStamp,
  downSampleDataForDateRange
}
