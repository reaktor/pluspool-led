import React from 'react'
import Slider from 'rc-slider'
import dayjs from 'dayjs'
import { throttle } from 'lodash'
import { formatTime } from '../../helpers/date'
import { scale } from '../../helpers/data'
import './index.css'
import 'rc-slider/assets/index.css'

const RcHandle = Slider.Handle

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

    this.changeTimestampThrottled = throttle((value) => {
      const { changeTimestamp } = this.props
      changeTimestamp(value)
    }, 100)
  }

  onChange (value) {
    this.changeTimestampThrottled(this.scaleFrom(value))
  }

  // Scale from Slider value to our timestamp
  scaleFrom (value) {
    const { range: { start, end } } = this.props
    return scale(value, 0, 100, end, start)
  }

  // Scale our timestamp to our Slider value
  scaleTo (value) {
    const { range: { start, end } } = this.props
    return scale(value, end, start, 0, 100)
  }

  render () {
    const { timestamp, range: { start, end } } = this.props

    const timestampDate = dayjs(timestamp)
    const diff = dayjs().diff(timestamp)

    const startDate = dayjs(start)
    const startDateDiff = dayjs().diff(startDate)
    const atStart = startDate.isSame(timestampDate)

    const endDate = dayjs(end)
    const endDateDiff = dayjs().diff(endDate)
    const atEnd = endDate.isSame(timestampDate)

    return (
      <div className='data-range-picker'>
        <label className='data-range-picker__label'>{formatTime(endDateDiff)}</label>
        <div className='data-range-picker__slider-container'>
          <Slider
            value={this.scaleTo(timestamp)}
            onChange={value => this.onChange(value)}
            handle={(props) =>
              handle({
                label: formatTime(diff),
                atStart,
                atEnd,
                ...props
              })
            }
          />
        </div>
        <label className='data-range-picker__label'>{formatTime(startDateDiff)}</label>
      </div>
    )
  }
}

export default DataRangePicker
