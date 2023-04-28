import React from 'react';
import cx from 'classnames';
import RcSlider from 'rc-slider';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { throttle } from 'lodash';
import { scale } from '../../helpers/data';
import { isMobile } from '../../helpers/layout';
import useIsMobile from '../../hooks/useIsMobile';
import 'rc-slider/assets/index.css';
import styles from './DataRangePicker.module.css';

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
      <div className={cx(styles.sliderContainer, styles.customSliderContainer)}>
        <RcSlider
          className={styles.customSlider}
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

export default DataRangePicker