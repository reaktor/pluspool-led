import React from 'react'
// import useThrottleFn from 'react-use/lib/useThrottleFn'
// import { useThrottle, useThrottleCallback } from '@react-hook/throttle'
// import useDebouncedCallback from 'use-debounce/lib/callback'
import dayjs from 'dayjs'
import { formatTime } from '../../helpers/date'
import './index.css'

import { throttle } from 'lodash'

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

  render () {
    const { timestamp, range: { start, end } } = this.props

    const diff = dayjs().diff(timestamp)

    const startDate = dayjs(start)
    const startDateDiff = dayjs().diff(startDate)

    const endDate = dayjs(end)
    const endDateDiff = dayjs().diff(endDate)

    return (
      <div className='data-range-picker'>
        <label className='data-range-picker__label'>{formatTime(startDateDiff)}</label>
        <div className='data-range-picker__slider-container'>
          <time className='data-range-picker__current-time'>{formatTime(diff)}</time>
          <input
            className='data-range-picker__slider'
            type='range'
            onChange={event => this.onChange(event)}
            value={timestamp}
            min={start}
            max={end}
            step={1}
          />
        </div>
        <label className='data-range-picker__label'>{formatTime(endDateDiff)}</label>
      </div>
    )
  }
}

// const DataRangePicker = ({ changeTimestamp, timestamp, range: { start, end } }) => {
//   // const [throttledTimestamp, setThrottledTimeStamp] = useState(timestamp)
//   // const [throttledFunction] = useDebouncedCallback(value => {
//   //   console.log(value);
//   //   setThrottledTimeStamp(value)
//   // }, 1000)
//   const [value, setValue] = useThrottle(timestamp, 2000, false)

//   return (
//     <div className='data-range-picker'>
//       <label>Past</label>
//       {value}
//       <input
//         className='data-range-picker__slider'
//         type='range'
//         onChange={event => setValue(event.target.value)}
//         min={start}
//         max={end}
//         step={1}
//       />
//       <label>Now</label>
//     </div>
//   )
// }

export default DataRangePicker
