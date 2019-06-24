import React from 'react'
import RcSlider from 'rc-slider'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { throttle } from 'lodash'
import { scale } from '../../helpers/data'
import './index.css'
import 'rc-slider/assets/index.css'

dayjs.extend(relativeTime)

const SLIDER_MIN = 0
const SLIDER_MAX = 100
const RcHandle = RcSlider.Handle

const handle = ({ atStart, atEnd, label, value, dragging, index, ...restProps }) => {
  const visible = !atStart && !atEnd
  const visibleClassName = visible ? '--visible' : '' // cannot do this with a data-attr in Preact for some reason
  return (
    <RcHandle value={value} {...restProps}>
      <div className={`data-range-picker__handle-label ${visibleClassName}`}>{label}</div>
    </RcHandle>
  )
}

class DataRangePicker extends React.Component {
  constructor (props) {
    super(props)

    this.onChange = throttle(this.onChange, 1000 / 60)
  }

  onChange (value) {
    const { setTimestamp } = this.props
    setTimestamp(this.scaleFrom(value))
  }

  // Scale from Slider value to our timestamp
  scaleFrom (value) {
    const { range: { start, end } } = this.props
    return scale(value, SLIDER_MIN, SLIDER_MAX, end, start)
  }

  // Scale our timestamp to our Slider value
  scaleTo (value) {
    const { range: { start, end } } = this.props
    return scale(value, end, start, SLIDER_MIN, SLIDER_MAX)
  }

  render () {
    const { timestamp, range: { start, end } } = this.props

    const timestampDate = dayjs(timestamp)
    const diff = dayjs().to(timestamp)

    const startDate = dayjs(start)
    const startDateDiff = dayjs().to(startDate)
    const atStart = startDate.isSame(timestampDate)

    const endDate = dayjs(end)
    const endDateDiff = dayjs().to(endDate)
    const atEnd = endDate.isSame(timestampDate)

    return (
      <div className='data-range-picker'>
        <label className='data-range-picker__label'>{endDateDiff}</label>
        <div className='data-range-picker__slider-container'>
          <RcSlider
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            value={this.scaleTo(timestamp)}
            onChange={value => this.onChange(value)}
            handle={(props) =>
              handle({
                label: diff,
                atStart,
                atEnd,
                ...props
              })
            }
          />
        </div>
        <label className='data-range-picker__label'>{startDateDiff}</label>
      </div>
    )
  }
}

export default DataRangePicker
