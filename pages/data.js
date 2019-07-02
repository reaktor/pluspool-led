import React from 'react'
import Link from 'next/link'
import datagarrison from 'datagarrison'
import Head from 'next/head'
import Graphs from '../components/Graphs'
import { fetchStationData, fetchNoaaData } from '../helpers/data'
import './index.css'

function DataPage (props) {
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
      <section>
        <h1>
          <Link href='/'>
            <a>+ Pool</a>
          </Link>
        </h1>
        <Graphs {...props} />
      </section>
    </div>
  )
}

DataPage.getInitialProps = async () => {
  const rawStationData = await fetchStationData()
  const stationData = datagarrison.parse(rawStationData)

  const rawNoaaData = await fetchNoaaData()
  const noaaData = rawNoaaData.data

  return { stationData, noaaData }
}

export default DataPage
