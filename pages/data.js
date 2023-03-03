import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Tooltip from '../components/Tooltip'

//dynamically / lazy load import graphs component without server side rendering as chart.js + zoom and pan requires usage of browser window API
const DynamicGraphs = dynamic(() => import('../components/Graphs'), {ssr: false})

const DataPage = ({ sources, samples, units }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [tooltipSlug, setTooltipSlug] = useState(null)

  const openTooltip = slug => {
    setTooltipSlug(slug)
    setTooltipOpen(true)
  }

  const closeTooltip = () => setTooltipOpen(false)

  return (
    <main className='page' data-template='data'>
      <Tooltip open={tooltipOpen} slug={tooltipSlug} closeTooltip={closeTooltip} sources={sources} units={units} />
      <div className='page__body'>
        <DynamicGraphs openTooltip={openTooltip} samples={samples} units={units} />
      </div>
    </main>
  )
}

DataPage.displayName = 'DataPage'

export default DataPage
