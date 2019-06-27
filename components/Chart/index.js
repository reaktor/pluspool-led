import React, { useEffect } from 'react'
import { LineSeriesCanvas, XAxis, YAxis, XYPlot } from 'react-vis'

let startTime = 0

const Chart = ({ x, y, header, unit, data, domain }) => {
  useEffect(() => {
    console.log(`renderTime = ${new Date() - startTime}ms`)
  }, [])

  startTime = new Date()
  const dataSeries = data.map(datum => ({ x: datum[x], y: datum[y] }))

  return (
    <div>
      <XYPlot height={300} width={300}>
        <XAxis />
        <YAxis />
        <LineSeriesCanvas data={dataSeries} />
      </XYPlot>
    </div>
  )
}

export default Chart
