import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { dataValues, before, getSamples } from '../../helpers/data'
import Graph from '../Graph'
import GraphsDateFilter from '../GraphsDateFilter'
import './index.css'

const timeUnits = ['day', 'week', 'month', 'year']

const generateGraphObject = ({ label, unit, column }) => ({
  header: label,
  unit: unit,
  y: column
})

const graphs = [
  generateGraphObject(dataValues.direction),
  generateGraphObject(dataValues.speed),
  generateGraphObject(dataValues.oxygen),
  generateGraphObject(dataValues.salinity),
  generateGraphObject(dataValues.turbidity),
  generateGraphObject(dataValues.ph)
]

const Graphs = ({ noaaData, stationData }) => {
  if (!noaaData && !stationData) return null

  const data = useMemo(() => getSamples({ noaaData, stationData }), [noaaData, stationData])
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
        units={timeUnits}
        activeUnit={activeUnit}
        onChange={filterOnClick}
        name='span'
      />
      <div className='graphs'>
        {graphs.map(graph => (
          <Graph x='t' domain={domain} data={data} {...graph} />
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
