import { useState, useEffect } from 'react'
import { fetchSamplesData } from '../helpers/data'

const useSamples = initialSamples => {
  const getRange = samples => ({
    start: samples[0].noaaTime,
    end: samples[samples.length - 1].noaaTime
  })

  const [samples, setSamples] = useState(initialSamples)

  const [range, setRange] = useState(getRange(initialSamples))

  useEffect(() => setRange(getRange(samples)), [samples])

  useEffect(() => fetchSamplesData().then(({ samples }) => setSamples(samples)))

  return [samples, range]
}

const useSample = initialSamples => {
  const getSampleAtTimestamp = (samples, timestamp) => {
    return samples.find(({ noaaTime }) => noaaTime >= timestamp)
  }

  const [samples, range] = useSamples(initialSamples)
  const [timestamp, setTimestamp] = useState(range.end)
  const [sample, setSample] = useState(getSampleAtTimestamp(samples, timestamp))

  useEffect(() => setSample(getSampleAtTimestamp(samples, timestamp)), [samples, timestamp])

  useEffect(() => setTimestamp(range.end), [range])
  return [sample, range, timestamp, setTimestamp]
}

export default { useSample, useSamples }
