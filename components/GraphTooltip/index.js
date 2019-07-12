import React from 'react'
import dayjs from 'dayjs'
import './index.css'

const GraphTooltip = (props) => {
  const { unit, overlayGraph, data, point: { data: { x, y }, index } } = props
  const overlayData = overlayGraph && data[index][overlayGraph.y]

  return (<div className='graph-tooltip'>
    <div className='graph-tooltip__date'>{dayjs(x).format('MMM DD YYYY HH:mm')}</div>
    <div className='graph-tooltip__data'>
      Salinity: {y.toFixed(2)} {unit}
    </div>
    {overlayData &&
      <div className='graph-tooltip__data'>
        Oxygen: {overlayData.toFixed(2)} {overlayGraph.unit}
      </div>
    }
  </div>)
}

export default GraphTooltip
