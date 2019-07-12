import React, { useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Databar from '../components/Databar'
import DataRangePicker from '../components/DataRangePicker'
import TitleText from '../components/TitleText'
import SvgVisualization from '../components/SvgVisualization'
import Tooltip from '../components/Tooltip'
import { fetchSamplesData } from '../helpers/data'
import './index.css'

function IndexPage ({ samples }) {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [tooltipSlug, setTooltipSlug] = useState(null)

  const range = {
    start: samples[0].noaaTime,
    end: samples[samples.length - 1].noaaTime
  }

  const [timestamp, setTimestamp] = useState(range.end)
  const sample = samples.find(({ noaaTime }) => noaaTime >= timestamp)

  return (
    <main className='page' data-template='index'>
      <Head>
        <title>+Pool Light Installation</title>
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
