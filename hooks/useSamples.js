import { useState, useEffect } from 'react'
import { fetchSamplesData } from '../helpers/data'

const useSamples = initialSamples => {
  const [samples, setSamples] = useState(initialSamples)

  useEffect(() => fetchSamplesData().then(({ samples }) => setSamples(samples)))
  return [samples]
}

const getSampleAtTimestamp = (samples, timestamp) => {
  return samples.find(({ noaaTime }) => noaaTime >= timestamp)
}

const useSample = initialSamples => {
  const [samples] = useSamples(initialSamples)

  const range = {
    start: samples[0].noaaTime,
    end: samples[samples.length - 1].noaaTime
  }

  const [timestamp, setTimestamp] = useState(range.end)

  const sample = getSampleAtTimestamp(samples, timestamp)

  useEffect(() => {
    if (timestamp === initialSamples[initialSamples.length - 1].noaaTime) {
      setTimestamp(range.end)
    }
  }, [range])

  return [sample, range, timestamp, setTimestamp]
}

export { useSample, useSamples }
