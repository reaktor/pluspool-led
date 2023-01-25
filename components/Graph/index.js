import React, { useEffect, useRef, useState } from 'react';
import Circle from '../../icons/Circle'
import CloseCircle from '../../icons/CloseCircle'
import OverlayData from '../../icons/OverlayData'
import QuestionMark from '../../icons/QuestionMark'
import Legend from '../Legend'
import GraphTooltip from '../GraphTooltip'
import { cutData, formXYSeries } from '../../helpers/data';
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
      min: dataPoint.min || 0,
      max: dataPoint.max || 'auto'
    },
    enableGridX: false,
    lineWidth: 1,
    pointSize: 0,
    tooltip: props => GraphTooltip({ label, unit, overlayGraph, data, ...props }),
    axisBottom: {
      format: d => dayjs(d).format('MMM D, YYYY'),
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

  const firstRun = useRef(true)
  const [seekDate, setSeekDate] = useState(graph.domain[0])
  const [data, setData] = useState(graph.data)
  console.log(overlayGraph)
  const overlayData = overlayGraph ? overlayGraph.data : []

  useEffect(() => {
    // do not filter any data on the first run
    if (firstRun.current) {
      return
    }
    setSeekDate(graph.domain[0])
    console.log('running seek')
    setData(cutData(graph.data, 'noaaTime', graph.domain[1], seekDate))
  }, [graph.domain])

  useEffect(() => {
    // do not filter data on the first run, it's already filtered
    if (!firstRun.current) {
      console.log('filtering data')
      setData(cutData(graph.data, 'noaaTime', graph.domain[1], seekDate))
    }
  }, [seekDate])

  useEffect(() => {
    // update the firstRun reference to false as the component has been mounted and effects above have executed
    // we can start updating data if date seeking changes or if date range changes in the parent Graphs component
    firstRun.current = false
  }, [])

  const onSeekChange = (e) => {
    setSeekDate(e.target.value)
  }

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
          {content.tooltip[graph.slug] &&
            <button
              type='button'
              className='graph__question-mark'
              onClick={() => openTooltip(graph.slug)}
            >
              <QuestionMark />
            </button>}
        </div>
      </header>
      <input style={{ margin: '10px 0 25px 18px', accentColor: graph.color }} type='range' min={graph.domain[1]} max={graph.domain[0]} onChange={onSeekChange} value={seekDate} />
      <div className='graph__graph-wrapper'>
        <LineGraph
          {...graph}
          data={data}
          domain={[seekDate, graph.domain[1]]}
          overlayGraph={overlayGraph}
          props={lineGraphProps}
          dataPoint={content.dataPoints[graph.slug]}
        />
        {overlayGraph && overlayGraph.slug !== graph.slug &&
          <div className='graph__overlay-graph'>
            <LineGraph
              {...overlayGraph}
              data={overlayData}
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
