import React from 'react'
import PropTypes from 'prop-types'
import { dataValues } from '../../helpers/data'
import DatabarItem from '../DatabarItem'
import './index.css'

const displayedSlugsTop = [
  'bacteria',
  'oxygen',
  'salinity',
  'turbidity',
  'ph'
]

const displayedSlugsBottom = [
  'speed',
  'direction',
  'depth'
]

const displayDatabarItem = ({ openTooltip, sample, slug }) => {
  const data = dataValues[slug]
  return (
    <DatabarItem
      key={slug}
      value={sample[slug]}
      onClick={() => openTooltip(slug)}
      {...data}
    />
  )
}

const Databar = ({ sample, openTooltip }) => {
  return (
    <div className='databar'>
      <div className='databar__wrapper'>
        {displayedSlugsTop
          .filter(slug => slug in sample)
          .map(slug => displayDatabarItem({ openTooltip, sample, slug }))}
      </div>
      <div className='databar__wrapper'>
        {displayedSlugsBottom
          .filter(slug => slug in sample)
          .map(slug => displayDatabarItem({ openTooltip, sample, slug }))}
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
