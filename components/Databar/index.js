import React from 'react'
import PropTypes from 'prop-types'
import { dataValues } from '../../helpers/data'
import DatabarItem from '../DatabarItem'
import { svgIcons } from '../../helpers/icons'
import './index.css'

const displayedColumns = [
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
        {displayedColumns
          .filter(column => dataValues[column].column in sample)
          .map(
            slug => {
              const data = dataValues[slug]
              const icon = svgIcons[slug]
              return (
                <DatabarItem
                  key={slug}
                  icon={icon && icon()}
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
