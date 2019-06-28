import React, { useEffect } from 'react'
import { ResponsiveLineCanvas } from '@nivo/line'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

let startTime = 0

const Tooltip = (props) => {
  const { unit, point: { serieColor, data: { x, y } } } = props
  return (
    <div
      style={{
        background: 'black',
        padding: '9px 12px',
        border: `1px solid ${serieColor}`
      }}
    >
      <div style={{ color: serieColor }}>{y} {unit}</div>
      <div>{dayjs(x).format('HH:mm DD/MM/YYYY')}</div>
    </div>
  )
}

const Chart = ({ x, y, header, unit, data, domain: [min, max] }) => {
  if (typeof document === 'undefined') return null

  useEffect(() => {
    console.log(`renderTime = ${new Date() - startTime}ms`)
  }, [])

  startTime = new Date()

  const dataSeries = data.map(datum => {
    return {
      x: Date.parse(datum[x]),
      y: parseFloat(datum[y])
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
    <div style={{ height: '600px', width: '960px' }}>
      <ResponsiveLineCanvas data={dataRender} width={800} height={600} curve='monotoneX'
        margin={{ top: 50, right: 160, bottom: 50, left: 128 }}
        xScale={{ type: 'linear', min, max }}
        yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto' }}
        colors={{ scheme: 'nivo' }}
        enableArea
        enableGridX={false}
        lineWidth={1}
        pointSize={4}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={1}
        enablePointLabel
        onClick={onClick}
        axisLeft={{
          format: d => `${d} ${unit}`,
          legend: header,
          legendOffset: -96,
          legendPosition: 'middle'
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
  )
}

export default Chart
