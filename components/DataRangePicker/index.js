import React from 'react';
import RcSlider from 'rc-slider';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { throttle } from 'lodash';
import { scale } from '../../helpers/data';
import { isMobile } from '../../helpers/layout';
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

class DataRangePicker extends React.Component {
  constructor (props) {
    super(props);

    this.onChange = throttle(this.onChange, 1000 / 60);
  }

  onChange (value) {
    const { setTimestamp } = this.props;
    setTimestamp(this.scaleFrom(value));
  }

  // Scale from Slider value to our timestamp
  scaleFrom (value) {
    const {
      range: { start, end },
    } = this.props;
    // On mobile we need to flip our min and max in order to have the slider start from the left
    // Without doing this the slider would put "Today" at the right side
    return isMobile() && this.props.indexPage
      ? scale(value, SLIDER_MAX, SLIDER_MIN, start, end)
      : scale(value, SLIDER_MIN, SLIDER_MAX, start, end);
  }

  // Scale our timestamp to our Slider value
  scaleTo (value) {
    const {
      range: { start, end },
    } = this.props;
    // On mobile we need to flip our min and max in order to have the slider start from the left
    // Without doing this the slider would put "Today" at the right side
    return isMobile() && this.props.indexPage
      ? scale(value, start, end, SLIDER_MAX, SLIDER_MIN)
      : scale(value, start, end, SLIDER_MIN, SLIDER_MAX);
  }

  render () {
    const {
      timestamp,
      range: { start, end },
    } = this.props;

    const timestampDate = dayjs(timestamp);
    const formattedDate = dayjs(timestamp).format('ddd MMM D, YYYY');

    const startDate = dayjs(start);
    const atStart = startDate.isSame(timestampDate);

    const endDate = dayjs(end);
    const atEnd = endDate.isSame(timestampDate);

    return (
      <div className={styles.container}>
        <div className={`${styles.sliderContainer} ${this.props.indexPage ? styles.customSliderContainer : ''}`}>
          <RcSlider
            className={this.props.indexPage ? styles.customSlider : ''}
            vertical={!isMobile() && this.props.indexPage}
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            value={this.scaleTo(timestamp)}
            onChange={(value) => this.onChange(value)}
            railStyle={{ width: '100%' }}
            handleRender={(node) => handle({
              label: formattedDate,
              atStart,
              atEnd,
              ...node.props
            })}
          />
        </div>
        {this.props.indexPage && (
        <div className={styles.labels}>
          <label className={styles.label}>Latest</label>
          <label className={styles.label}>Oldest</label>
        </div>
        )}
      </div>
    );
  }
}

export default DataRangePicker;
