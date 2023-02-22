import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Circle from '../../icons/Circle'
import CloseCircle from '../../icons/CloseCircle'
import OverlayData from '../../icons/OverlayData'
import QuestionMark from '../../icons/QuestionMark'
import GraphTooltip from '../GraphTooltip'
import { cutData, formXYSeries } from '../../helpers/data';
import content from '../../content'
import { ResponsiveLineCanvas } from '@nivo/line'
import dayjs from 'dayjs'
import styles from './Graph.module.css';
import DataRangePicker from '../DataRangePicker';


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
  dataPoint,
}) => {
  const dataRender = [{ id: label, data: formXYSeries(data, x, y) }];
  const latestAvailableDate = dataRender[0].data[dataRender[0].data.length - 1];
  const defaultProps = {
    curve: 'linear',
    margin: { top: 10, right: 40, bottom: 50, left: 40 },
    xScale: {
      type: 'linear',
      min: latestAvailableDate ? latestAvailableDate.x : xMin, // Always use the latest date from the filtered data as the maximum point on the graph -- left side of x-axis.
                                                               // Otherwise, use the provided date from the Graphs date filter or the graph date seeker
                                                               // This avoids holes in the graph when the latest available date with values is up to a day or more behind
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
    tooltip: (props) =>
      GraphTooltip({ label, unit, overlayGraph, data, ...props }),
    axisBottom: {
      format: (d) => dayjs(d).format('MMM D, YYYY'),
      tickValues: 3,
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 30,
    },
    data: dataRender,
    colors: [color],
  };

  return <ResponsiveLineCanvas {...defaultProps} {...props} />;
};

const Graph = ({
  graph,
  overlayGraph,
  setOverlayGraph,
  openTooltip,
  units,
}) => {
  const firstRun = useRef(true)
  const shouldFilterBySeek = useRef(false)
  const [seekDate, setSeekDate] = useState(graph.domain[0])
  const [data, setData] = useState(graph.data)
  const [overlayData, setOverlayData] = useState(overlayGraph ? overlayGraph.data : [])

  // run and cut data down if the minimum date range changes
  useEffect(() => {
    // do not filter any data on the first run
    if (firstRun.current) {
      return
    }
    // reset the seek date back to default if it was changed prior to date filter change
    const maxSeekDate = graph.domain[0]
    setSeekDate(maxSeekDate)
    shouldFilterBySeek.current = false

    setData(cutData(graph.data, 'noaaTime', graph.domain[1], maxSeekDate))
  }, [graph.domain, setSeekDate])

  // update the overlayGraph data if it gets set by the Graphs parent component
  useEffect(() => {
    if (firstRun.current) {
      return
    }
    setOverlayData(overlayGraph ? overlayGraph.data : [])
  }, [overlayGraph, setOverlayData])

  useEffect(() => {
    // only cut data if it's not a first render, and the hook above didn't already filter the data after the seeker value was changed from previous value to default, EX:
    // If user changes the seeker value, and then changes the date filter below the nav bar
    if (firstRun.current || !shouldFilterBySeek.current) {
      return
    }
    setData(cutData(graph.data, 'noaaTime', graph.domain[1], seekDate))
    setOverlayData(overlayGraph ? cutData(overlayGraph.data, 'noaaTime', overlayGraph.domain[1], seekDate) : [])
  }, [seekDate, setData, setOverlayData]) // will not run if the previous value is the same as new value, hence removing double runs.

  useEffect(() => {
    // update the firstRun reference to false as the component has been mounted and effects above have executed
    // we can start updating data if date seeking changes or if date filter changes in the parent Graphs component
    firstRun.current = false
  }, [])

  // memoize onSeekChange so function remains the same between all re-renders
  const onSeekChange = useCallback((value) => {
    setSeekDate(value)
    shouldFilterBySeek.current = true
  }, [setSeekDate])


  // memoize the graph props, so they don't get re-created on each update
  const lineGraphProps = useMemo(() => ({
    gridYValues: 5,
    axisLeft: { format: d => `${d}`, tickValues: 5 }
  }), [])

  const overlayGraphProps = useMemo(() => ({
    axisLeft: null,
    axisRight: { format: d => `${d}` },
    enableGridY: false
  }), [])

  if (typeof document === 'undefined') return null

  return (
    <section>
      <header className={styles.header}>
        <h2 className={styles.title}>
          <div className={styles.circle}>
            <Circle fill={graph.color} />
          </div>
          <span className={styles.titleText}>
            {graph.label} ({units[graph.slug]})
          </span>
        </h2>
        <div className={styles.right}>
          {overlayGraph && overlayGraph.y !== graph.y && (
            <button
              className={styles.overlayPickerButton}
              onClick={() => setOverlayGraph(null)}
            >
              <div className={styles.circle}>
                <Circle fill={overlayGraph.color} />
              </div>
              <span className={styles.text}>
                {overlayGraph.label} ({units[overlayGraph.slug]})
              </span>
              <div className={styles.close}>
                <CloseCircle />
              </div>
            </button>
          )}
          {!overlayGraph && (
            <button
              className={styles.overlayPickerButton}
              onClick={() => setOverlayGraph(graph.slug)}
            >
              <span className={styles.text}>Overlay Data</span>
              <span className={styles.icon}>
                <OverlayData />
              </span>
            </button>
          )}
          {content.tooltip[graph.slug] && (
            <button
              type='button'
              className={styles.questionMark}
              onClick={() => openTooltip(graph.slug)}
            >
              <QuestionMark />
            </button>
          )}
        </div>
      </header>
      <div className={styles.graphWrapper}>
        <LineGraph
          {...graph}
          data={data}
          domain={[seekDate, graph.domain[1]]}
          overlayGraph={overlayGraph}
          props={lineGraphProps}
          dataPoint={content.dataPoints[graph.slug]}
        />
        {/* do not render an overlayGraph if it's the same graph as the one it's overlaying, causing a double render of the same exact graph */}
        {overlayGraph && overlayGraph.slug !== graph.slug && (
          <div className={styles.overlayGraph}>
            <LineGraph
              {...overlayGraph}
              data={overlayData}
              domain={[seekDate, overlayGraph.domain[1]]}
              props={overlayGraphProps}
              dataPoint={content.dataPoints[overlayGraph.slug]}
            />
          </div>
        )}
      </div>
      <div className={styles.seekerContainer}>
        <DataRangePicker
          setTimestamp={onSeekChange}
          timestamp={seekDate}
          range={{
            start: graph.domain[0],
            end: graph.domain[1]
          }}
        />
      </div>
    </section>
  );
};

export default Graph

// // Can set up a Date label for more context by applying the following styles to the seeker container:
// display: flex;
// padding: 0 35px 0 25px;
// margin: 5px 0 20px 0;
// flex-wrap: nowrap;
// align-items: self-end;
//
// // applying the following style to the div surrounding the label
// margin-right: 20px
// <div>
// <label>Date</label>
// </div>
//
// // And adding a width of 100% to the dateRangePicker container