import React, { useState } from 'react'

import Databar from '../components/Databar'
import DataRangePicker from '../components/DataRangePicker'
import TitleText from '../components/TitleText'
import SvgVisualization from '../components/SvgVisualization'
import Tooltip from '../components/Tooltip'
import { useSample } from '../hooks/useSamples'
import PageWrapper, {getPageData} from '../components/PageWrapper'
import { DATE_UNITS } from '../helpers/constants';

const IndexPage = ({ sources, units, ...samples }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [tooltipSlug, setTooltipSlug] = useState()
  const [sample, range, timestamp, setTimestamp] = useSample(samples[DATE_UNITS.YEAR])
  const [pageState, setPageState] = useState(0)

  const advanceIntro = () => pageState < 1 && setPageState(pageState + 1)

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
      <SvgVisualization sample={sample} />
    </main>
  )
}

IndexPage.displayName = 'IndexPage'

// export default IndexPage
export const getStaticProps = getPageData('index') // returns getStaticProps Next.js function that has access to page argument

export default PageWrapper(IndexPage)