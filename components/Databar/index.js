import React from 'react'
import PropTypes from 'prop-types'
import { labels, units, transforms } from '../../helpers/data'
import DatabarItem from '../DatabarItem'
import './index.css'

const displayedColumns = [
  'Percent Oxygen_SDI_0_10_%',
  'Salinity_SDI_0_4_ppt',
  'Turbidity_SDI_0_8_NTU',
  's',
  'd'
]

const Databar = ({ sample }) => {
  return (
    <div className='databar'>
      {displayedColumns.map(
        column =>
          sample[column] && (
            <DatabarItem
              key={column}
              label={labels[column]}
              value={sample[column]}
              unit={units[column]}
              transform={transforms[column]}
            />
          )
      )}
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
