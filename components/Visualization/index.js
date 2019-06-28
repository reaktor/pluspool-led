import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Databar from '../Databar'
import DataRangePicker from '../DataRangePicker'
import PaperAnimation from '../PaperAnimation'
import { getSamples } from '../../helpers/data'
import './index.css'

const Visualization = ({
  noaaData,
  stationData,
  setTooltipKey,
  setTooltipOpen
}) => {
  const samples = getSamples({ noaaData, stationData })

  const range = {
    start: Date.parse(samples[0].t),
    end: Date.parse(samples[samples.length - 1].t)
  }

  const [timestamp, setTimestamp] = useState(range.end)
  const sample = samples.find(({ t }) => Date.parse(t) >= timestamp)

  const wrapper = useRef(null)
  const paperAnimation = useRef(null)

  const initPaperAnimation = () => {
    paperAnimation.current = new PaperAnimation({
      wrapper: wrapper.current,
      onIconClick: ({ icon }) => {
        setTooltipKey(icon)
        setTooltipOpen(true)
        // setTooltipPosition(point)
      }
    })
  }

  const updatePaperAnimation = () => {
    paperAnimation.current.updateProps({ sample })
  }

  useEffect(initPaperAnimation, [])
  useEffect(updatePaperAnimation, [sample])

  return (
    <div className='visualization'>
      <div ref={wrapper} className='visualization__animation' />
      <div className='visualization__bottom'>
        <Databar
          sample={sample}
          onItemClick={(icon) => {
            setTooltipKey(icon)
            setTooltipOpen(true)
          }}
        />
        <DataRangePicker setTimestamp={setTimestamp} timestamp={timestamp} range={range} />
      </div>
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
