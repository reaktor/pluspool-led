import React from 'react'
import PropTypes from 'prop-types'
import { dataValues } from '../../helpers/data'
import DatabarItem from '../DatabarItem'
import './index.css'

const displayedSlugs = [
  'bacteria',
  'oxygen',
  'salinity',
  'turbidity',
  'speed',
  'direction',
  'ph'
]

const Databar = ({ onItemClick, sample }) => {
  return (
    <div className='databar'>
      <div className='databar__wrapper'>
        {displayedSlugs
          .filter(slug => slug in sample)
          .map(
            slug => {
              const data = dataValues[slug]
              return (
                <DatabarItem
                  key={slug}
                  value={sample[slug]}
                  onClick={() => onItemClick(slug)}
                  {...data}
                />
              )
            }
          )}
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
