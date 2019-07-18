import React, { useState } from 'react'

import Databar from '../components/Databar'
import DataRangePicker from '../components/DataRangePicker'
import TitleText from '../components/TitleText'
import SvgVisualization from '../components/SvgVisualization'
import Tooltip from '../components/Tooltip'
import { fetchSamplesData } from '../helpers/data'
import { useSample } from '../hooks/useSamples'
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
    <main className='page' data-template='index' data-page-state={pageState}>
      <Tooltip
        open={tooltipOpen}
        slug={tooltipSlug}
        sample={sample}
        closeTooltip={closeTooltip}
        sources={sources}
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
  )
}

IndexPage.getInitialProps = fetchSamplesData

export default IndexPage
