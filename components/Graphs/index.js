import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { before } from '../../helpers/data'
import Chart from '../Chart'
import GraphsDateFilter from '../GraphsDateFilter'
import './index.css'

const units = ['day', 'week', 'month', 'year']

const graphs = [
  {
    header: 'Water Direction',
    unit: 'degrees',
    y: 'd'
  },
  {
    header: 'Water Speed',
    unit: 'knots',
    y: 's'
  },
  {
    header: 'Percent Oxygen',
    unit: '%',
    y: 'Percent Oxygen_SDI_0_10_%'
  },
  {
    header: 'Salinity',
    unit: 'PPT',
    y: 'Salinity_SDI_0_4_ppt'
  },
  {
    header: 'Turbidity',
    unit: 'NTU',
    y: 'Turbidity_SDI_0_8_NTU'
  },
  {
    header: 'pH',
    unit: 'pH',
    y: 'pH mV_SDI_0_7_V'
  }
]

const Graphs = ({ samples }) => {
  if (!samples) return null

  const data = samples
  const [activeUnit, setActiveUnit] = useState('month')
  const [domain, setDomain] = useState([Date.now(), before(activeUnit)])

  const setSpan = unit => setDomain([Date.now(), before(unit)])
  const filterOnClick = unit => {
    setActiveUnit(unit)
    setSpan(unit)
  }

  return (
    <>
      <GraphsDateFilter
        units={units}
        activeUnit={activeUnit}
        onChange={filterOnClick}
        name='span'
      />
      <div className='graphs'>
        {graphs.map(graph => (
          <Chart x='t' domain={domain} data={data} {...graph} />
        ))}
      </div>
    </>
  )
}

Graphs.defaultProps = {
  noaaData: null,
  stationData: null
}

Graphs.propTypes = {
  noaaData: PropTypes.array,
  stationData: PropTypes.object
}

export default Graphs
