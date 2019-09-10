import React, { useState } from 'react'

import Head from 'next/head'
import SocialMetaTags from '../components/SocialMetaTags'
import Databar from '../components/Databar'
import DataRangePicker from '../components/DataRangePicker'
import TitleText from '../components/TitleText'
import SvgVisualization from '../components/SvgVisualization'
import Tooltip from '../components/Tooltip'
import { useSample } from '../hooks/useSamples'
import { BASE_URL } from '../helpers/constants'
import content from '../content'
import './index.css'


const IndexPage = ({ sources, units, samples }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [tooltipSlug, setTooltipSlug] = useState()

  const [sample, range, timestamp, setTimestamp] = useSample(samples)
  const [pageState, setPageState] = useState(0)

  const advanceIntro = () => pageState < 1 && setPageState(pageState + 1)

  const openTooltip = slug => {
    setTooltipSlug(slug)
    setTooltipOpen(true)
  }
  const closeTooltip = () => setTooltipOpen(false)

  return (
    <>
      <SocialMetaTags
        url={content.social.url}
        title={content.social.title}
        description={content.social.description}
        image_url={content.social.image_url}
      />
      <main className='page' data-template='index' data-page-state={pageState}>
        <Tooltip
          open={tooltipOpen}
          slug={tooltipSlug}
          sample={sample}
          closeTooltip={closeTooltip}
          sources={sources}
          units={units}
        />
        <TitleText
          timestamp={timestamp}
          sample={sample}
          pageState={pageState}
          onClick={advanceIntro}
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
          openTooltip={pageState ? openTooltip : advanceIntro}
          sample={sample}
        />
      </main>
    </>
  )
}

IndexPage.displayName = 'IndexPage'

export default IndexPage
