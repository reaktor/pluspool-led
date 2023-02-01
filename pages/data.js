import React, { useState } from 'react'

import Graphs from '../components/Graphs'
import Tooltip from '../components/Tooltip'

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
        <Graphs openTooltip={openTooltip} samples={samples} units={units} />
      </div>
    </main>
  )
}

DataPage.displayName = 'DataPage'

export default DataPage
