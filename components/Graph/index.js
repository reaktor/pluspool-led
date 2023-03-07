import Circle from '../../icons/Circle'
import CloseCircle from '../../icons/CloseCircle'
import OverlayData from '../../icons/OverlayData'
import QuestionMark from '../../icons/QuestionMark'
import content from '../../content'
import styles from './Graph.module.css';
import LineGraph from '../LineGraph';

const Graph = ({
  graph,
  activeDateFilter,
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
              aria-label={`remove ${overlayGraph.slug} overlay data`}
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
              aria-label={`overlay ${graph.slug} data`}
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
              aria-label={`${graph.slug} details`}
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
          activeDateFilter={activeDateFilter}
          xSeries={xSeries}
          data={graph.data}
          overlayGraph={overlayGraph}
          hasOverlay={overlayGraph && overlayGraph.slug !== graph.slug}
          dataPoint={content.dataPoints[graph.slug]}
        />
      </div>
    </section>
  );
};

export default Graph