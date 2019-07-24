import React, { useState } from 'react'

import Head from 'next/head'
import SocialMetaTags from '../components/SocialMetaTags'
import Graphs from '../components/Graphs'
import Tooltip from '../components/Tooltip'
import { BASE_URL } from '../helpers/constants'
import './index.css'

const DataPage = ({ sources, samples, units }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [tooltipSlug, setTooltipSlug] = useState(null)

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
          title={'+ POOL Water Quality Data Dashboard'}
          description={'A detailed dashboard for visualizing the components of water quality in the + POOL floating pool in the East River of NYC.'}
          image_url={`${BASE_URL}/static/img/data-social-preview.png`}
        />
      </Head>
      <main className='page' data-template='data'>
        <Tooltip open={tooltipOpen} slug={tooltipSlug} closeTooltip={closeTooltip} sources={sources} units={units} />
        <div className='page__body'>
          <Graphs openTooltip={openTooltip} samples={samples} />
        </div>
      </main>
    </>
  )
}

export default DataPage
