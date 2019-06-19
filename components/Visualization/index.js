import React, { useState, useRef, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import Databar from '../Databar'
import PaperAnimation from '../PaperAnimation'
import { getSampleAtTimestamp, constrain } from '../../helpers/data'
import './index.css' /* eslint-disable-line import/no-unassigned-import */

const Visualization = ({ noaaData, stationData }) => {
  const initialRange = constrain({
    start: Date.parse(noaaData[0].t),
    end: Date.parse(noaaData[noaaData.length - 1].t)
  },
  {
    start: stationData.samples[0][0],
    end: stationData.samples[stationData.samples.length - 2][0]
  })
  const [range, constrainRange] = useReducer(constrain, initialRange)

  const [timestamp, setTimestamp] = useState(initialRange.end)

  const initialSample = getSampleAtTimestamp({}, {
    noaaData,
    stationData,
    timestamp
  })
  const [sample, updateSample] = useReducer(getSampleAtTimestamp, initialSample)

  // Constrain the date range when we get new noaa data
  useEffect(() => {
    if (noaaData && noaaData.length > 0) {
      constrainRange({
        start: Date.parse(noaaData[0].t),
        end: Date.parse(noaaData[noaaData.length - 1].t)
      })
    }
  }, [noaaData])

  // Constrain the date range when we get new station data
  useEffect(() => {
    if (stationData && stationData.samples && stationData.samples.length > 1) {
      constrainRange({
        start: stationData.samples[0][0],
        end: stationData.samples[stationData.samples.length - 2][0]
      })
    }
  }, [stationData])

  // Make sure timestamp is within our range
  useEffect(() => {
    setTimestamp(timestamp =>
      Math.min(Math.max(timestamp, range.start), range.end)
    )
  }, [range])

  const wrapper = useRef(null)
  const paperAnimation = useRef(null)

  useEffect(() => {
    updateSample({
      noaaData,
      stationData,
      timestamp
    })
  }, [noaaData, stationData, timestamp])

  const changeTimestamp = () => {
    setTimestamp(range.start + Math.floor(Math.random() * (range.end - range.start)))
  }

  const initPaperAnimation = () => {
    paperAnimation.current = new PaperAnimation({ wrapper: wrapper.current })
  }

  const updatePaperAnimation = () => {
    paperAnimation.current.updateProps({ sample })
  }

  useEffect(initPaperAnimation, [])
  useEffect(updatePaperAnimation, [paperAnimation, sample])

  return (
    <div className='visualization'>
      <div ref={wrapper} className='visualization__animation' />
      <Databar
        className='visualization__databar'
        changeSample={changeTimestamp}
        sample={sample}
      />
    </div>
  )
}

Visualization.defaultProps = {
  noaaData: null,
  stationData: null
}

Visualization.propTypes = {
  noaaData: PropTypes.array,
  stationData: PropTypes.object
}

export default Visualization
