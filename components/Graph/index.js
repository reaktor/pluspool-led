import dynamic from 'next/dynamic';
import Circle from '../../icons/Circle'
import CloseCircle from '../../icons/CloseCircle'
import OverlayData from '../../icons/OverlayData'
import QuestionMark from '../../icons/QuestionMark'
import GraphTooltip from '../GraphTooltip'
import { cutData, formXYData, formXYSeries } from '../../helpers/data';
import content from '../../content'
import dayjs from 'dayjs'
import styles from './Graph.module.css';
import { useMemo } from 'react';


const LineGraphDynamic = dynamic(() => import("../LineGraph/index"), {ssr: false})

const Graph = ({
  graph,
  overlayGraph,
  setOverlayGraph,
  openTooltip,
  units,
}) => {
  // const [data] = useState(graph.data)
  // const [overlayData] = useState(overlayGraph ? overlayGraph.data : [])

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
        <LineGraphDynamic
          {...graph}
          data={graph.data}
          domain={[graph.domain[0], graph.domain[1]]}
          overlayGraph={overlayGraph}
          props={lineGraphProps}
          dataPoint={content.dataPoints[graph.slug]}
        />
        {/* do not render an overlayGraph if it's the same graph as the one it's overlaying, causing a double render of the same exact graph */}
        {overlayGraph && overlayGraph.slug !== graph.slug && (
          <div className={styles.overlayGraph}>
            <LineGraphDynamic
              {...overlayGraph}
              data={overlayGraph.data}
              domain={[overlayGraph.domain[0], overlayGraph.domain[1]]}
              props={overlayGraphProps}
              dataPoint={content.dataPoints[overlayGraph.slug]}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Graph