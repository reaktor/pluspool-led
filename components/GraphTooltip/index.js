import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import styles from './GraphTooltip.module.css';

dayjs.extend(utc);

const GraphTooltip = (props) => {
  const {
    unit,
    label,
    overlayGraph,
    data,
    point: {
      data: { x, y },
      index,
    },
  } = props;
  const overlayData = overlayGraph && data[index][overlayGraph.y];

  return (
    <div className={styles.container}>
      <div className={styles.date}>
        {dayjs(x).local().format('MMM DD YYYY HH:mm A')}
      </div>
      <div>
        {label}: {y.toFixed(2)} {unit}
      </div>
      {overlayData && (
        <div>
          {overlayGraph.label}: {overlayData.toFixed(2)} {overlayGraph.unit}
        </div>
      )}
    </div>
  );
};

export default GraphTooltip;
