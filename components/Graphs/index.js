import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { dataValues, before } from '../../helpers/data'
import Graph from '../Graph'
import GraphsDateFilter from '../GraphsDateFilter'
import './index.css'

const timeUnits = ['day', 'week', 'month', 'year']

const generateGraphObject = ({ label, unit, slug }) => ({
  header: label,
  unit: unit,
  y: slug
})

const graphs = [
  generateGraphObject(dataValues.direction),
  generateGraphObject(dataValues.speed),
  generateGraphObject(dataValues.oxygen),
  generateGraphObject(dataValues.salinity),
  generateGraphObject(dataValues.turbidity),
  generateGraphObject(dataValues.ph)
]

const Graphs = ({ samples }) => {
  if (!samples) return null

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
          <Graph x='noaaTime' domain={domain} data={samples} {...graph} />
        ))}
      </div>
    </>
  )
}

Graphs.defaultProps = {
  samples: null
}

Graphs.propTypes = {
  samples: PropTypes.array
}

export default Graphs
