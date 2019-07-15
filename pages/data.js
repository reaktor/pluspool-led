import React, { useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Graphs from '../components/Graphs'
import Tooltip from '../components/Tooltip'
import { fetchSamplesData } from '../helpers/data'
import { useSamples } from '../hooks/useSamples'
import './index.css'

function DataPage ({ samples: initialSamples }) {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [tooltipSlug, setTooltipSlug] = useState(null)
  const [samples] = useSamples(initialSamples)

  return (
    <main className='page' data-template='data'>
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
        closeTooltip={() => setTooltipOpen(false)}
      />
      <div className='page__top'>
        <Navbar />
      </div>
      <div className='page__body'>
        <Graphs
          setTooltipSlug={setTooltipSlug}
          setTooltipOpen={setTooltipOpen}
          samples={samples}
        />
      </div>
    </main>
  )
}

DataPage.getInitialProps = fetchSamplesData

export default DataPage
