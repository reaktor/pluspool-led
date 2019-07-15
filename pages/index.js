import React, { useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Databar from '../components/Databar'
import DataRangePicker from '../components/DataRangePicker'
import TitleText from '../components/TitleText'
import SvgVisualization from '../components/SvgVisualization'
import Tooltip from '../components/Tooltip'
import { fetchSamplesData } from '../helpers/data'
import { useSample } from '../hooks/useSamples'
import './index.css'

function IndexPage ({ samples: initialSamples }) {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [tooltipSlug, setTooltipSlug] = useState()
  const [sample, range, timestamp, setTimestamp] = useSample(initialSamples)

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
