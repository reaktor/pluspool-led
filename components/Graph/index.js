'use client'

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
import styles from './Graph.module.css';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

dayjs.extend(relativeTime);

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
  const defaultProps = {
    curve: 'linear',
    margin: { top: 10, right: 40, bottom: 50, left: 40 },
    xScale: {
      type: 'linear',
      min: xMin,
      max: xMax,
    },
    yScale: {
      type: 'linear',
      stacked: false,
      min: dataPoint.min || 'auto',
      max: dataPoint.max || 'auto',
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
  // const [showGraph, setShowGraph] = useState(true);

  // useEffect(() => {
  //   if (typeof document === 'undefined') {
  //     setShowGraph(false);
  //   }
  // }, []);

  const lineGraphProps = {
    gridYValues: 5,
    axisLeft: { format: (d) => `${d}`, tickValues: 5 },
  };

  const overlayGraphProps = {
    axisLeft: null,
    axisRight: { format: (d) => `${d}` },
    enableGridY: false,
  };

  const { legend } = content.dataPoints[graph.slug];

  // if (showGraph) {
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
          overlayGraph={overlayGraph}
          props={lineGraphProps}
          dataPoint={content.dataPoints[graph.slug]}
        />
        {overlayGraph && (
          <div className={styles.overlayGraph}>
            <LineGraph
              {...overlayGraph}
              props={overlayGraphProps}
              dataPoint={content.dataPoints[overlayGraph.slug]}
            />
          </div>
        )}
      </div>
      <div className={styles.legend}>
        {legend && <Legend legend={legend} />}
      </div>
    </section>
  );
  // } else {
  //   return <div></div>;
  // }
};

export default Graph
