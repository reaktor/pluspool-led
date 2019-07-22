import { useState, useEffect } from 'react'
import { fetchSamplesData } from '../helpers/dataLoader'

const getSampleAtTimestamp = (samples, timestamp) => {
  return samples.find(({ noaaTime }) => noaaTime >= timestamp)
}

const getRange = samples => ({
  start: samples[0].noaaTime,
  end: samples[samples.length - 1].noaaTime
})

// TODO: FIX NULL FILTERING
export const useSample = samples => {
  const range = getRange(samples)
  const [timestamp, setTimestamp] = useState(range.end)
  const sample = getSampleAtTimestamp(samples, timestamp)
  return [sample, range, timestamp, setTimestamp]
}
