import React, { useState, useEffect } from 'react'
import datagarrison from 'datagarrison'
import Head from 'next/head'
import Graphs from '../components/Graphs'
import { fetchStationData, fetchNoaaData } from '../helpers/data'
import './index.css'

function DataPage () {
  const [stationData, setStationData] = useState()
  const [noaaData, setNoaaData] = useState()

  const getStationData = () => {
    fetchStationData().then(text => setStationData(datagarrison.parse(text)))
  }

  const getNoaaData = () => {
    fetchNoaaData().then(response => setNoaaData(response.data))
  }

  useEffect(getStationData, [])
  useEffect(getNoaaData, [])

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
      <section className='wrapper shaded-wrapper'>
        <h2>Graphs</h2>
        <Graphs noaaData={noaaData} stationData={stationData} />
      </section>
    </div>
  )
}

export default DataPage
