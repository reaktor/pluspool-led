import React from 'react'
import Slider from 'rc-slider'
import dayjs from 'dayjs'
import { throttle } from 'lodash'
import { formatTime } from '../../helpers/date'
import { scale } from '../../helpers/data'
import './index.css'
import 'rc-slider/assets/index.css'

const RcHandle = Slider.Handle

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props
  return (
    <RcHandle value={value} {...restProps} />
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

  onChange ({ target }) {
    const { value } = target
    const valueInt = parseInt(value, 10)
    this.changeTimestampThrottled(valueInt)
  }

  onChange2 (value) {
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

    const diff = dayjs().diff(timestamp)

    const startDate = dayjs(start)
    const startDateDiff = dayjs().diff(startDate)

    const endDate = dayjs(end)
    const endDateDiff = dayjs().diff(endDate)

    return (
      <div className='data-range-picker'>
        <label className='data-range-picker__label'>{formatTime(endDateDiff)}</label>
        <div className='data-range-picker__slider-container'>
          <time className='data-range-picker__current-time'>{formatTime(diff)}</time>
          <Slider value={this.scaleTo(timestamp)} onChange={value => this.onChange2(value)} handle={handle} />
        </div>
        <label className='data-range-picker__label'>{formatTime(startDateDiff)}</label>
      </div>
    )
  }
}

export default DataRangePicker
