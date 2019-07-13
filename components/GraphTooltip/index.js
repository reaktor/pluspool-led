import React from 'react'
import dayjs from 'dayjs'
import './index.css'

const GraphTooltip = (props) => {
  const { unit, label, overlayGraph, data, point: { data: { x, y }, index } } = props
  const overlayData = overlayGraph && data[index][overlayGraph.y]
  return (<div className='graph-tooltip'>
    <div className='graph-tooltip__date'>{dayjs(x).subtract(5, 'hours').format('MMM DD YYYY HH:mm')}</div>
    <div className='graph-tooltip__data'>
      {label}: {y.toFixed(2)} {unit}
    </div>
    {overlayData &&
      <div className='graph-tooltip__data'>
        {overlayGraph.label}: {overlayData.toFixed(2)} {overlayGraph.unit}
      </div>
    }
  </div>)
}

export default GraphTooltip
