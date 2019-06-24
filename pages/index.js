import React from 'react'
import Link from 'next/link'
import datagarrison from 'datagarrison'
import Head from 'next/head'
import Visualization from '../components/Visualization'
import { fetchStationData, fetchNoaaData } from '../helpers/data'
import './index.css'

function IndexPage ({ stationData, noaaData }) {
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
      <Visualization noaaData={noaaData} stationData={stationData} />
      {/* <section className='wrapper'>
        <h1>
          <Link href='/'>
            <a>+ Pool</a>
          </Link>
        </h1>
      </section> */}
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
