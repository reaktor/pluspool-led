import React, { useEffect } from 'react'
import Circle from '../../icons/Circle'
import CloseCircle from '../../icons/CloseCircle'
import QuestionMark from '../../icons/QuestionMark'
import GraphTooltip from '../GraphTooltip'
import { ResponsiveLineCanvas } from '@nivo/line'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './index.css'

dayjs.extend(relativeTime)

let startTime = 0

const LineGraph = ({
  x,
  y,
  label,
  unit,
  data,
  color,
  domain: [min, max],
  props,
  overlayGraph
}) => {
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
    id: label,
    data: dataSeries
  }]

  const defaultProps = {
    curve: 'linear',
    margin: { top: 10, right: 40, bottom: 50, left: 40 },
    xScale: { type: 'linear', min, max },
    yScale: { type: 'linear', stacked: false, min: 'auto', max: 'auto' },
    enableGridX: false,
    lineWidth: 1,
    pointSize: 0,
    tooltip: props => GraphTooltip({ unit, overlayGraph, data, ...props }),
    axisBottom: {
      format: d => dayjs().subtract(5,'hours').to(dayjs(d)),
      tickValues: 3,
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 30
    },
    data: dataRender,
    colors: [color],
    onClick: onClick
  }

  return (
    <ResponsiveLineCanvas
      {...defaultProps}
      {...props}
    />
  )
}

const Graph = ({
  graph,
  overlayGraph,
  setOverlayGraph,
  setTooltipSlug,
  setTooltipOpen
}) => {
  if (typeof document === 'undefined') return null

  useEffect(() => {
    console.log(`renderTime = ${new Date() - startTime}ms`)
  }, [])

  startTime = new Date()

  return (
    <section>
      <header className='graph__header'>
        <h2 className='graph__title'>
          <div className='graph__overlay-picker-button__icon'>
            <Circle fill={graph.color} />
          </div>
          <span className='graph__overlay-picker-button__text'>
            {graph.label} ({graph.unit})
          </span>
        </h2>
        <div className='graph__header__right'>
          {overlayGraph && overlayGraph.y !== graph.y &&
            <button
              className='graph__overlay-picker-button'
              onClick={() => setOverlayGraph(null)}
            >
              <div className='graph__overlay-picker-button__icon'>
                <Circle fill={overlayGraph.color} />
              </div>
              <span className='graph__overlay-picker-button__text'>
                {overlayGraph.label} ({overlayGraph.unit})
              </span>
              <div className='graph__overlay-picker-button__close'>
                <CloseCircle />
              </div>
            </button>
          }
          {!overlayGraph &&
            <button
              className='graph__overlay-picker-button'
              onClick={() => setOverlayGraph(graph.slug)}
            >
              <span className='graph__overlay-picker-button__text'>
                Compare
              </span>
            </button>
          }
          <button
            type='button'
            className='graph__question-mark'
            onClick={() => {
              setTooltipSlug(graph.slug)
              setTooltipOpen(true)
            }}
          >
            <QuestionMark />
          </button>
        </div>
      </header>
      <div className='graph__graph-wrapper'>
        <LineGraph
          {...graph}
          overlayGraph={overlayGraph}
          props={{
            gridYValues: 5,
            axisLeft: {
              format: d => `${d}`,
              tickValues: 5
            }
          }}
        />
        {overlayGraph &&
        <div className='graph__overlay-graph'>
          <LineGraph
            {...overlayGraph}
            props={{
              axisLeft: null,
              axisRight: {
                format: d => `${d}`
              },
              enableGridY: false
            }}
            tooltip={null}
          />
        </div>
        }
      </div>
    </section>
  )
}

export default Graph
