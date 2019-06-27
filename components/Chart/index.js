import React, { useEffect, useRef } from 'react'
import CanvasJS from '../../lib/canvasjs/canvasjs.react'

let startTime = 0

const Chart = ({ x, y, header, unit, data, domain }) => {
  const canvasRef = useRef()

  useEffect(() => {
    console.log(`renderTime = ${new Date() - startTime}ms`)
  }, [])

  const dataSeries = [{
    type: 'line',
    dataPoints: data.map(datum => ({ x: datum[x], y: datum[y] }))
  }]

  const spanStyle = {
    position: 'absolute',
    top: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
    backgroundColor: '#d85757',
    padding: '0px 4px',
    color: '#ffffff'
  }

  const options = {
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: header
    },
    axisY: {
      includeZero: false
    },
    data: dataSeries
  }

  startTime = new Date()

  return (
    <div>
      <CanvasJS.CanvasJSChart options={options} ref={canvasRef} />
      <span id='timeToRender' style={spanStyle} />
    </div>
  )
}

export default Chart
