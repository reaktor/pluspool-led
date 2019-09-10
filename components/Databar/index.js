import React from 'react'
import PropTypes from 'prop-types'
import content from '../../content'
import DatabarItem from '../DatabarItem'
import './index.css'

const displayedSlugsTop = [
  'bacteria',
  'temperature',
  'turbidity',
  'salinity',
  'oxygen',
  'ph'
]

const displayedSlugsBottom = [
  'direction',
  'speed',
  'depth'
]

const displayDatabarItem = ({ openTooltip, sample, slug, showColor }) => {
  const datum = content.dataPoints[slug]

  return (
    <DatabarItem
      key={slug}
      value={sample[slug]}
      onClick={() => openTooltip(slug)}
      showColor={showColor}
      {...datum}
    />
  )
}

const Databar = ({ sample, openTooltip }) => {
  return (
    <div className='databar'>
      <div className='databar__wrapper'>
        {displayedSlugsTop
          .filter(slug => slug in sample)
          .map(slug => displayDatabarItem({ openTooltip, sample, slug, showColor: true }))}
      </div>
      <div className='databar__wrapper'>
        {displayedSlugsBottom
          .filter(slug => slug in sample)
          .map(slug => displayDatabarItem({ openTooltip, sample, slug, showColor: false }))}
      </div>
    </div>
  )
}

Databar.propTypes = {
  sample: PropTypes.object
}

Databar.defaultProps = {
  sample: {}
}

export default Databar
