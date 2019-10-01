import React from 'react'
import Circle from '../../icons/Circle'
import CloseCircle from '../../icons/CloseCircle'
import OverlayData from '../../icons/OverlayData'
import QuestionMark from '../../icons/QuestionMark'
import Legend from '../Legend'
import GraphTooltip from '../GraphTooltip'
import { formXYSeries } from '../../helpers/data'
import content from '../../content'
import { ResponsiveLineCanvas } from '@nivo/line'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './index.css'

dayjs.extend(relativeTime)

const LineGraph = ({
  x,
  y,
  label,
  unit,
  data,
  color,
  domain: [xMin, xMax],
  props,
  overlayGraph,
  dataPoint
}) => {
  const dataRender = [{ id: label, data: formXYSeries(data, x, y) }]
  const defaultProps = {
    curve: 'linear',
    margin: { top: 10, right: 40, bottom: 50, left: 40 },
    xScale: {
      type: 'linear',
      min: xMin,
      max: xMax
    },
    yScale: {
      type: 'linear',
      stacked: false,
      min: dataPoint.min || 'auto',
      max: dataPoint.max || 'auto'
    },
    enableGridX: false,
    lineWidth: 1,
    pointSize: 0,
    tooltip: props => GraphTooltip({ label, unit, overlayGraph, data, ...props }),
    axisBottom: {
      format: d => dayjs().to(dayjs(d)),
      tickValues: 3,
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 30
    },
    data: dataRender,
    colors: [color]
  }

  return (<ResponsiveLineCanvas {...defaultProps} {...props} />)
}

const Graph = ({
  graph,
  overlayGraph,
  setOverlayGraph,
  openTooltip,
  units
}) => {
  if (typeof document === 'undefined') return null

  const lineGraphProps = {
    gridYValues: 5,
    axisLeft: { format: d => `${d}`, tickValues: 5 }
  }

  const overlayGraphProps = {
    axisLeft: null,
    axisRight: { format: d => `${d}` },
    enableGridY: false
  }

  const { legend } = content.dataPoints[graph.slug]

  return (
    <section>
      <header className='graph__header'>
        <h2 className='graph__title'>
          <div className='graph__title__circle'>
            <Circle fill={graph.color} />
          </div>
          <span className='graph__title__text'>
            {graph.label} ({units[graph.slug]})
          </span>
        </h2>
        <div className='graph__header__right'>
          {overlayGraph && overlayGraph.y !== graph.y &&
            <button
              className='graph__overlay-picker-button'
              onClick={() => setOverlayGraph(null)}
            >
              <div className='graph__overlay-picker-button__circle'>
                <Circle fill={overlayGraph.color} />
              </div>
              <span className='graph__overlay-picker-button__text'>
                {overlayGraph.label} ({units[overlayGraph.slug]})
              </span>
              <div className='graph__overlay-picker-button__close'>
                <CloseCircle />
              </div>
            </button>}
          {!overlayGraph &&
            <button
              className='graph__overlay-picker-button'
              onClick={() => setOverlayGraph(graph.slug)}
            >
              <span className='graph__overlay-picker-button__text'>
                Overlay Data
              </span>
              <span className='graph__overlay-picker-button__icon'>
                <OverlayData />
              </span>
            </button>}
          <button
            type='button'
            className='graph__question-mark'
            onClick={() => openTooltip(graph.slug)}
          >
            <QuestionMark />
          </button>
        </div>
      </header>
      <div className='graph__graph-wrapper'>
        <LineGraph
          {...graph}
          overlayGraph={overlayGraph}
          props={lineGraphProps}
          dataPoint={content.dataPoints[graph.slug]}
        />
        {overlayGraph &&
          <div className='graph__overlay-graph'>
            <LineGraph
              {...overlayGraph}
              props={overlayGraphProps}
              dataPoint={content.dataPoints[overlayGraph.slug]}
            />
          </div>}
      </div>
      <div className='graph__legend'>
        {legend && <Legend legend={legend} />}
      </div>
    </section>
  )
}

export default Graph
