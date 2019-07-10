import React, { useState } from 'react'
import Head from 'next/head'
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
    <div>
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
      <div className='index-page'>
        <div className='index-page__top'>
          <div className='index-page__top-bar'>
            <h2 className='index-page__label-title'>+ <span className='index-page__label-title__label'>Pool Water Quality Dashboard</span></h2>
            <div className='index-page__link-out'>
              <span className='index-page__link-out__label'>Want to learn more and get involved?{' '}</span>
              <a className='index-page__link-out__link' href='https://pluspool.org' target='_BLANK' rel='noopener'>pluspool.org</a>
            </div>
          </div>
          <TitleText timestamp={timestamp} sample={sample} />
          <DataRangePicker
            setTimestamp={setTimestamp}
            timestamp={timestamp}
            range={range}
          />
          <Databar
            sample={sample}
            onItemClick={(icon) => {
              setTooltipSlug(icon)
              setTooltipOpen(true)
            }}
          />
        </div>
        <SvgVisualization
          setTooltipSlug={setTooltipSlug}
          setTooltipOpen={setTooltipOpen}
          sample={sample}
        />
      </div>
    </div>
  )
}

IndexPage.getInitialProps = async () => {
  const samples = await fetchSamplesData()

  return { samples }
}

export default IndexPage
