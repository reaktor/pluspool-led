import { useState } from 'react'

const getSampleAtTimestamp = (samples, timestamp) => {
  return samples.find(({ noaaTime }) => noaaTime >= timestamp)
}

const getRange = samples => ({
  start: samples[0].noaaTime,
  end: samples[samples.length - 1].noaaTime
})

// TODO: FIX NULL FILTERING
export const useSample = samplesWithNulls => {
  const samples = samplesWithNulls.filter(d => Object.values(d).every(v => v !== null))
  const range = getRange(samples)
  const [timestamp, setTimestamp] = useState(range.end)
  const sample = getSampleAtTimestamp(samples, timestamp)
  return [sample, range, timestamp, setTimestamp]
}
