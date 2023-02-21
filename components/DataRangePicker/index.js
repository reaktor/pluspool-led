import React from 'react';
import RcSlider from 'rc-slider';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { throttle } from 'lodash';
import { scale } from '../../helpers/data';
import 'rc-slider/assets/index.css';
import styles from './DataRangePicker.module.css';
import useIsMobile from '../../hooks/useIsMobile';

dayjs.extend(relativeTime);

const SLIDER_MIN = 0;
const SLIDER_MAX = 100;

const handle = ({
  atStart,
  atEnd,
  label,
  value,
  dragging,
  index,
  ...restProps
}) => {
  const visible = !atStart && !atEnd;
  return (
    <div {...restProps}>
      <div className={styles.handleLabel} data-visible={visible}>
        {label}
      </div>
    </div>
  );
};


const DataRangePicker = (props) => {
  const isMobile = useIsMobile();

  const { timestamp, range: { start, end }} = props

  const scaleFrom = (value) => {
    // On mobile we need to flip our min and max in order to have the slider start from the left
    // Without doing this the slider would put "Today" at the right side
    return isMobile
      ? scale(value, SLIDER_MAX, SLIDER_MIN, start, end)
      : scale(value, SLIDER_MIN, SLIDER_MAX, start, end);
  }

  const scaleTo = (value) => {
    // On mobile we need to flip our min and max in order to have the slider start from the left
    // Without doing this the slider would put "Today" at the right side
    return isMobile
      ? scale(value, start, end, SLIDER_MAX, SLIDER_MIN)
      : scale(value, start, end, SLIDER_MIN, SLIDER_MAX);
  }

  const throttledOnchange = (value) => {
    const { setTimestamp } = props;
    setTimestamp(scaleFrom(value));
  }

  const onChange = throttle(throttledOnchange, 1000 / 600)

  const timestampDate = dayjs(timestamp);
  const formattedDate = dayjs(timestamp).format('ddd MMM D, YYYY');

  const startDate = dayjs(start);
  const atStart = startDate.isSame(timestampDate);

  const endDate = dayjs(end);
  const atEnd = endDate.isSame(timestampDate);

  return (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <RcSlider
          vertical={!isMobile}
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          value={scaleTo(timestamp)}
          onChange={(value) => onChange(value)}
          railStyle={{ width: '100%' }}
          handleRender={(node) => handle({
            label: formattedDate,
            atStart,
            atEnd,
            ...node.props
          })}
        />
      </div>
      <div className={styles.labels}>
        <label className={styles.label}>Latest</label>
        <label className={styles.label}>Oldest</label>
      </div>
    </div>
  );

}

// leaving this commented out for now for reference ::
//
// class DataRangePicker extends React.Component {
//   constructor (props) {
//     super(props);
//
//     this.onChange = throttle(this.onChange, 1000 / 60);
//   }
//
//   onChange (value) {
//     const { setTimestamp } = this.props;
//     setTimestamp(this.scaleFrom(value));
//   }
//
//   // Scale from Slider value to our timestamp
//   scaleFrom (value) {
//     const {
//       range: { start, end },
//     } = this.props;
//     // On mobile we need to flip our min and max in order to have the slider start from the left
//     // Without doing this the slider would put "Today" at the right side
//     return isMobile()
//       ? scale(value, SLIDER_MAX, SLIDER_MIN, start, end)
//       : scale(value, SLIDER_MIN, SLIDER_MAX, start, end);
//   }
//
//   // Scale our timestamp to our Slider value
//   scaleTo (value) {
//     const {
//       range: { start, end },
//     } = this.props;
//     // On mobile we need to flip our min and max in order to have the slider start from the left
//     // Without doing this the slider would put "Today" at the right side
//     return isMobile()
//       ? scale(value, start, end, SLIDER_MAX, SLIDER_MIN)
//       : scale(value, start, end, SLIDER_MIN, SLIDER_MAX);
//   }
//
//   render () {
//     const {
//       timestamp,
//       range: { start, end },
//     } = this.props;
//
//     const timestampDate = dayjs(timestamp);
//     const formattedDate = dayjs(timestamp).format('ddd MMM D, YYYY');
//
//     const startDate = dayjs(start);
//     const atStart = startDate.isSame(timestampDate);
//
//     const endDate = dayjs(end);
//     const atEnd = endDate.isSame(timestampDate);
//
//     return (
//       <div className={styles.container}>
//         <div className={styles.sliderContainer}>
//           <RcSlider
//             vertical={!isMobile()}
//             min={SLIDER_MIN}
//             max={SLIDER_MAX}
//             value={this.scaleTo(timestamp)}
//             onChange={(value) => this.onChange(value)}
//             railStyle={{ width: '100%' }}
//             handleRender={(node) => handle({
//               label: formattedDate,
//               atStart,
//               atEnd,
//               ...node.props
//             })}
//           />
//         </div>
//         <div className={styles.labels}>
//           <label className={styles.label}>Latest</label>
//           <label className={styles.label}>Oldest</label>
//         </div>
//       </div>
//     );
//   }
// }

export default DataRangePicker;
