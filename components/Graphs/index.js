import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { dataValues, before, cutData, downsampleData } from '../../helpers/data'
import Graph from '../Graph'
import GraphsDateFilter from '../GraphsDateFilter'
import DownloadData from '../DownloadData'
import './index.css'

const maxResolution = 1000 // points

const timeUnits = ['day', 'week', 'month', 'year']

const Graphs = ({ openTooltip, samples, units }) => {
  if (!samples) return null

  const [activeUnit, setActiveUnit] = useState('week')
  const [domain, setDomain] = useState([Date.now(), before(activeUnit)])
  const [overlayGraph, setOverlayGraph] = useState(null)

  const setSpan = unit => setDomain([Date.now(), before(unit)])
  const filterOnClick = unit => {
    setActiveUnit(unit)
    setSpan(unit)
  }

  const [max, min] = domain
  const dsColumns = Array.from(Object.keys(dataValues))
  const domainSamples = cutData(samples, 'noaaTime', min, max)
  const dsSamples = downsampleData(domainSamples, 'noaaTime', dsColumns, maxResolution)

  const graphProps = key => ({
    x: 'noaaTime',
    y: dataValues[key].slug,
    domain: domain,
    data: dsSamples,
    ...dataValues[key]
  })

  const graphs = dsColumns.map(key => (
    <Graph
      setOverlayGraph={setOverlayGraph}
      openTooltip={openTooltip}
      graph={graphProps(key)}
      units={units}
      overlayGraph={overlayGraph && graphProps(overlayGraph)}
    />
  ))

  return (
    <>
      <div className='graphs-top-bar'>
        <GraphsDateFilter
          units={timeUnits}
          activeUnit={activeUnit}
          onChange={filterOnClick}
          name='span'
        />
        <DownloadData />
      </div>
      <div className='graphs'>{graphs}</div>
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
