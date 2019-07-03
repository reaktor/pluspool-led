import React from 'react'
import PropTypes from 'prop-types'
import { dataValues } from '../../helpers/data'
import DatabarItem from '../DatabarItem'
import { svgIcons } from '../../helpers/icons'
import './index.css'

const displayedSlugs = [
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
          .filter(slug => dataValues[slug].column in sample)
          .map(
            slug => {
              const data = dataValues[slug]
              const icon = svgIcons[slug]
              const { column } = data
              return (
                <DatabarItem
                  key={slug}
                  icon={icon && icon()}
                  value={sample[column]}
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
