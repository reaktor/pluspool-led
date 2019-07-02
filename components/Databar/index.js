import React from 'react'
import PropTypes from 'prop-types'
import { dataValues } from '../../helpers/data'
import { ICON_COLORS } from '../../helpers/constants'
import DatabarItem from '../DatabarItem'
import './index.css'

import BacteriaIcon from '../../static/img/icons/bacteria.svg'
import DirectionIcon from '../../static/img/icons/direction.svg'
import OxygenIcon from '../../static/img/icons/oxygen.svg'
import SalinityIcon from '../../static/img/icons/salinity.svg'
import SpeedIcon from '../../static/img/icons/speed.svg'
import TurbidityIcon from '../../static/img/icons/turbidity.svg'

const svgIcons = {
  bacteria: BacteriaIcon,
  direction: DirectionIcon,
  oxygen: OxygenIcon,
  salinity: SalinityIcon,
  speed: SpeedIcon,
  turbidity: TurbidityIcon,
  ph: OxygenIcon
}

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
              const Icon = svgIcons[slug]
              const data = dataValues[slug]
              return (
                <DatabarItem
                  key={slug}
                  icon={<Icon />}
                  color={ICON_COLORS[slug]}
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
