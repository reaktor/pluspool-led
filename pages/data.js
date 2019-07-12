import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Graphs from '../components/Graphs'
import { fetchSamplesData } from '../helpers/data'
import './index.css'

function DataPage (props) {
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
      <div className='page__top'>
        <Navbar />
      </div>
      <div className='page__body'>
        <Graphs {...props} />
      </div>
    </main>
  )
}

DataPage.getInitialProps = fetchSamplesData

export default DataPage
