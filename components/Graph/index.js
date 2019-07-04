import React, { useEffect } from 'react'
import { ResponsiveLineCanvas } from '@nivo/line'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './index.css'

dayjs.extend(relativeTime)

let startTime = 0

const Tooltip = ({ unit, point: { serieColor, data: { x, y } } }) => (
  <div style={{
    background: 'black',
    padding: '9px 12px',
    border: `1px solid ${serieColor}`
  }}>
    <div style={{ color: serieColor }}>{y} {unit}</div>
    <div>{dayjs(x).format('HH:mm DD/MM/YYYY')}</div>
  </div>
)

const Graph = ({ x, y, header, unit, data, domain: [min, max] }) => {
  if (typeof document === 'undefined') return null

  useEffect(() => {
    console.log(`renderTime = ${new Date() - startTime}ms`)
  }, [])

  startTime = new Date()

  const dataSeries = data.map(datum => {
    return {
      x: datum[x],
      y: datum[y] || null
    }
  })

  const onClick = (point, event) => {
    console.dir({ point, event })
  }

  const dataRender = [{
    id: header,
    data: dataSeries
  }]

  return (
    <div>
      <h2 className='graph__header'>{header}</h2>
      <div style={{ height: '600px' }}>
        <ResponsiveLineCanvas
          data={dataRender}
          curve='monotoneX'
          margin={{ top: 0, right: 0, bottom: 50, left: 75 }}
          xScale={{ type: 'linear', min, max }}
          yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto' }}
          colors={{ scheme: 'nivo' }}
          enableGridX={false}
          lineWidth={1}
          pointSize={4}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={1}
          enablePointLabel
          onClick={onClick}
          axisLeft={{
            format: d => `${d} ${unit}`
          }}
          theme={{
            tooltip: {
              container: {
                background: 'black'
              }
            }
          }}
          tooltip={props => Tooltip({ unit, ...props })}
          axisBottom={{
            format: d => dayjs().to(dayjs(d)),
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0
          }}
        />
      </div>
    </div>
  )
}

export default Graph
