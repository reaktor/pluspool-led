import React from 'react'
import dayjs from 'dayjs'
// import PropTypes from 'prop-types'
import { formatTime } from '../../helpers/date'
import './index.css'

const VisualizationDate = ({ timestamp }) => {
  const diff = dayjs().diff(timestamp)

  return (
    <>
      <time>{formatTime(diff)}</time>
    </>
  )
}

export default VisualizationDate
