import React from 'react'
import PropTypes from 'prop-types'
import { labels, units, slugs, transforms } from '../../helpers/data'
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
  turbidity: TurbidityIcon
}

const displayedColumns = [
  'Percent Oxygen_SDI_0_10_%',
  'Salinity_SDI_0_4_ppt',
  'Turbidity_SDI_0_8_NTU',
  's',
  'd'
]

const Databar = ({ onItemClick, sample }) => {
  return (
    <div className='databar'>
      <div className='databar__wrapper'>
        {displayedColumns
          .filter(column => column in sample)
          .map(
            column => {
              const slug = slugs[column]
              const Icon = svgIcons[slug]
              return (
                <DatabarItem
                  key={column}
                  icon={<Icon />}
                  color={ICON_COLORS[slug]}
                  label={labels[column]}
                  value={sample[column]}
                  unit={units[column]}
                  transform={transforms[column]}
                  onClick={() => onItemClick(slug)}
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
