import React, { useState } from 'react'

import Graphs from '../components/Graphs'
import Tooltip from '../components/Tooltip'
import { fetchSamplesData } from '../helpers/data'
import { useSamples } from '../hooks/useSamples'
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
  )
}

DataPage.getInitialProps = fetchSamplesData

export default DataPage
