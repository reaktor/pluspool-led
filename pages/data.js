import React from 'react'
import Link from 'next/link'
import datagarrison from 'datagarrison'
import Head from 'next/head'
import Graphs from '../components/Graphs'
import { fetchStationData, fetchNoaaData } from '../helpers/data'
import './index.css'

function DataPage ({ stationData, noaaData }) {
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
        <h1>
          <Link href='/'>
            <a>+ Pool</a>
          </Link>
        </h1>
        <Graphs noaaData={noaaData} stationData={stationData} />
      </section>
    </div>
  )
}

DataPage.getInitialProps = async ({ req }) => {
  const rawStationData = await fetchStationData({ req })
  const stationData = datagarrison.parse(rawStationData)

  const rawNoaaData = await fetchNoaaData()
  const noaaData = rawNoaaData.data

  return { stationData, noaaData }
}

export default DataPage
