import dynamic from 'next/dynamic';
import Circle from '../../icons/Circle'
import CloseCircle from '../../icons/CloseCircle'
import OverlayData from '../../icons/OverlayData'
import QuestionMark from '../../icons/QuestionMark'
import content from '../../content'
import styles from './Graph.module.css';

//dynamically import the LineGraph so Next doesn't try to render it on the server when the component needs to have access to things like the browser window
const LineGraphDynamic = dynamic(() => import("../LineGraph/index"), {ssr: false})

const Graph = ({
  graph,
  activeUnit,
  xSeries,
  overlayGraph,
  setOverlayGraph,
  openTooltip,
  units,
}) => {

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
          activeUnit={activeUnit}
          xSeries={xSeries}
          data={graph.data}
          domain={[graph.domain[0], graph.domain[1]]}
          overlayGraph={overlayGraph}
          dataPoint={content.dataPoints[graph.slug]}
        />
      </div>
    </section>
  );
};

export default Graph