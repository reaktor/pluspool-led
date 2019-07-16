import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { dataValues, before } from '../../helpers/data'
import Graph from '../Graph'
import GraphsDateFilter from '../GraphsDateFilter'
import './index.css'

const timeUnits = ['day', 'week', 'month', 'year']

const Graphs = ({ openTooltip, samples }) => {
  if (!samples) return null

  const [activeUnit, setActiveUnit] = useState('day')
  const [domain, setDomain] = useState([Date.now(), before(activeUnit)])
  const [overlayGraph, setOverlayGraph] = useState(null)

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
        {Object.keys(dataValues).map(key => (
          <Graph
            setOverlayGraph={setOverlayGraph}
            openTooltip={openTooltip}
            graph={{
              x: 'noaaTime',
              y: dataValues[key].slug,
              domain: domain,
              data: samples,
              ...dataValues[key]
            }}
            overlayGraph={overlayGraph && {
              x: 'noaaTime',
              y: dataValues[overlayGraph].slug,
              domain: domain,
              data: samples,
              ...dataValues[overlayGraph]
            }}
          />
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
