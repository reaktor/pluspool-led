import { useState, useEffect } from 'react'
import { fetchSamplesData } from '../helpers/data'
import dayjs from 'dayjs'

const useSamples = initialSamples => {
  const [samples, setSamples] = useState(initialSamples)

  // Normally, you wouldn't need this, but we use next export to statically
  // generate the initial site.
  //
  // This means the initialSamples are going to be out of date.
  // So we check on each render if we need to update the samples.
  useEffect(() => {
    const latestTime = dayjs(samples[0].noaaTime * 1000)
    const sixMinutesAgo = dayjs().subtract(6, 'minutes')
    if (latestTime.isAfter(sixMinutesAgo)) return
    fetchSamplesData().then(({ samples }) => setSamples(samples))
  })
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
