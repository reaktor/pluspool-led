import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Databar from '../Databar'
import DataRangePicker from '../DataRangePicker'
import PaperAnimation from '../PaperAnimation'
import { getSampleAtTimestamp, constrain } from '../../helpers/data'
import './index.css'

const Visualization = ({
  noaaData,
  stationData,
  setTooltipKey,
  setTooltipOpen
}) => {
  const range = constrain(
    {
      start: Date.parse(noaaData[0].t),
      end: Date.parse(noaaData[noaaData.length - 1].t)
    },
    {
      start: stationData.samples[0][0],
      end: stationData.samples[stationData.samples.length - 2][0]
    }
  )

  const [timestamp, setTimestamp] = useState(range.end)

  const sample = getSampleAtTimestamp({ noaaData, stationData, timestamp })

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
