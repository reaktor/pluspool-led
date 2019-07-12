import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Databar from '../components/Databar'
import DataRangePicker from '../components/DataRangePicker'
import TitleText from '../components/TitleText'
import SvgVisualization from '../components/SvgVisualization'
import Tooltip from '../components/Tooltip'
import { fetchSamplesData } from '../helpers/data'
import './index.css'

const getRange = samples => ({
  start: samples[0].noaaTime,
  end: samples[samples.length - 1].noaaTime
})

const getLatestSample = samples => samples[0]

const getSampleAtTimestamp = (samples, timestamp) => {
  return samples.find(({ noaaTime }) => noaaTime >= timestamp)
}

function IndexPage ({ samples: initialSamples }) {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [tooltipSlug, setTooltipSlug] = useState()
  const [samples, setSamples] = useState(initialSamples)

  const [range, setRange] = useState(getRange(initialSamples))
  const [timestamp, setTimestamp] = useState(range.end)
  const [sample, setSample] = useState(getSampleAtTimestamp(samples,timestamp))

  useEffect(() => setSample(getSampleAtTimestamp(samples, timestamp)), [samples, timestamp])

  useEffect(() => setTimestamp(range.end), [range])

  useEffect(() => setRange(getRange(samples)), [samples])

  useEffect(() => fetchSamplesData().then(({date, samples}) => {
    console.log(date)
    setSamples(samples)
  }), [])

  return (
    <main className='page' data-template='index'>
      <Head>
        <title>+POOL Lights</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='shortcut icon' href='/static/favicon.ico' />
        <link
          href='https://fonts.googleapis.com/css?family=IBM+Plex+Mono&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Tooltip
        open={tooltipOpen}
        slug={tooltipSlug}
        sample={sample}
        closeTooltip={() => setTooltipOpen(false)}
      />
      <div className='page__top'>
        <Navbar />
        <TitleText timestamp={timestamp} sample={sample} />
        <DataRangePicker
          setTimestamp={setTimestamp}
          timestamp={timestamp}
          range={range}
        />
        <Databar sample={sample} />
      </div>
      <SvgVisualization
        setTooltipSlug={setTooltipSlug}
        setTooltipOpen={setTooltipOpen}
        sample={sample}
      />
    </main>
  )
}

IndexPage.getInitialProps = fetchSamplesData

export default IndexPage
