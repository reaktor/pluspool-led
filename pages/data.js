import React, { useState } from 'react'

import SocialMetaTags from '../components/SocialMetaTags'
import Graphs from '../components/Graphs'
import Tooltip from '../components/Tooltip'
import content from '../content'
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
      <SocialMetaTags
        url={content.social.url}
        title={content.social.title}
        description={content.social.description}
        image_url={content.social.image_url}
      />
      <main className='page' data-template='data'>
        <Tooltip open={tooltipOpen} slug={tooltipSlug} closeTooltip={closeTooltip} sources={sources} units={units} />
        <div className='page__body'>
          <Graphs openTooltip={openTooltip} samples={samples} units={units} />
        </div>
      </main>
    </>
  )
}

DataPage.displayName = 'DataPage'

export default DataPage
