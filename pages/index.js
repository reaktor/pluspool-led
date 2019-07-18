import React, { useState } from 'react'

import Head from 'next/head'
import SocialMetaTags from '../components/SocialMetaTags'
import Databar from '../components/Databar'
import DataRangePicker from '../components/DataRangePicker'
import TitleText from '../components/TitleText'
import SvgVisualization from '../components/SvgVisualization'
import Tooltip from '../components/Tooltip'
import { fetchSamplesData } from '../helpers/data'
import { useSample } from '../hooks/useSamples'
import { BASE_URL } from '../helpers/constants'
import './index.css'

const IndexPage = ({ sources, samples: initialSamples }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [tooltipSlug, setTooltipSlug] = useState()
  const [sample, range, timestamp, setTimestamp] = useSample(initialSamples)
  const [pageState, setPageState] = useState(0)

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
          title={'+ POOLWater Quality Dashboard'}
          description={'A beautiful dashboard for visualizing water quality in the +POOL floating pool in the East River of NYC.'}
          image_url={`${BASE_URL}/static/img/home-social-preview.png`}
        />
      </Head>
      <main className='page' data-template='index' data-page-state={pageState}>
        <Tooltip
          open={tooltipOpen}
          slug={tooltipSlug}
          sample={sample}
          closeTooltip={closeTooltip}
        />
        <TitleText
          timestamp={timestamp}
          sample={sample}
          pageState={pageState}
          onClick={() => pageState < 2 && setPageState(pageState + 1)}
        />
        <DataRangePicker
          setTimestamp={setTimestamp}
          timestamp={timestamp}
          range={range}
        />
        <Databar
          openTooltip={openTooltip}
          sample={sample}
        />
        <SvgVisualization
          openTooltip={openTooltip}
          sample={sample}
        />
      </main>
    </>
  )
}

IndexPage.getInitialProps = fetchSamplesData

export default IndexPage
