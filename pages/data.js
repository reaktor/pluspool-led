import React, { useState } from 'react'

import Head from 'next/head'
import SocialMetaTags from '../components/SocialMetaTags'
import Graphs from '../components/Graphs'
import Tooltip from '../components/Tooltip'
import { fetchSamplesData } from '../helpers/data'
import { useSamples } from '../hooks/useSamples'
import { BASE_URL } from '../helpers/constants'
import './index.css'

function DataPage ({ sources, samples: initialSamples }) {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [tooltipSlug, setTooltipSlug] = useState(null)
  const [samples] = useSamples(initialSamples)

  const openTooltip = slug => {
    setTooltipSlug(slug)
    setTooltipOpen(true)
  }

  const closeTooltip = () => setTooltipOpen(false)

  return (
    <>
      <Head>
        <SocialMetaTags
          url={BASE_URL}
          title={'+ POOLWater Quality Data Dashboard'}
          description={'A detailed dashboard for visualizing the components of water quality in the +POOL floating pool in the East River of NYC.'}
          image_url={`${BASE_URL}/static/img/data-social-preview.png`}
        />
      </Head>
      <main className='page' data-template='data'>
        <Tooltip
          open={tooltipOpen}
          slug={tooltipSlug}
          closeTooltip={closeTooltip}
          sources={sources}
        />
        <div className='page__body'>
          <Graphs
            openTooltip={openTooltip}
            samples={samples}
          />
        </div>
      </main>
    </>
  )
}

DataPage.getInitialProps = fetchSamplesData

export default DataPage
