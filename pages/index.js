import React, { useState } from 'react'
import datagarrison from 'datagarrison'
import Head from 'next/head'
import Visualization from '../components/Visualization'
import Tooltip from '../components/Tooltip'
import { fetchStationData, fetchNoaaData } from '../helpers/data'
import './index.css'

function IndexPage ({ stationData, noaaData }) {
  const [tooltopPosition] = useState({ x: 0, y: 0 })
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [tooltipKey, setTooltipKey] = useState(null)

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
        position={tooltopPosition}
        tooltipKey={tooltipKey}
        closeTooltip={() => setTooltipOpen(false)}
      />
      <Visualization
        noaaData={noaaData}
        stationData={stationData}
        setTooltipKey={setTooltipKey}
        setTooltipOpen={setTooltipOpen}
      />
    </div>
  )
}

IndexPage.getInitialProps = async () => {
  const rawStationData = await fetchStationData()
  const stationData = datagarrison.parse(rawStationData)

  const rawNoaaData = await fetchNoaaData()
  const noaaData = rawNoaaData.data

  return { stationData, noaaData }
}

export default IndexPage
