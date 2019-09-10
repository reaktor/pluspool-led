import React from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import './index.css'

dayjs.extend(utc)

const GraphTooltip = (props) => {
  const { unit, label, overlayGraph, data, point: { data: { x, y }, index } } = props
  const overlayData = overlayGraph && data[index][overlayGraph.y]

  return (<div className='graph-tooltip'>
    <div className='graph-tooltip__date'>{dayjs(x).local().format('MMM DD YYYY HH:mm A')}</div>
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
