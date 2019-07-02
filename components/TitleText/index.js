import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { dataValues } from '../../helpers/data'
import './index.css'

dayjs.extend(relativeTime)

const levelText = {
  oxygen: (value) => {
    if (value < 40) {
      return 'less oxygenated than usual'
    }
    if (value < 60) {
      return 'oxygenated as usual'
    }

    return 'more oxygenated than usual'
  }
}

function TitleText ({ timestamp, sample }) {
  const timestampDiff = dayjs().to(timestamp)
  const oxygenLevel = sample[dataValues.oxygen.column]
  const oxygenText = levelText.oxygen(oxygenLevel)

  return (
    <h1 className='title-text'>
      The water {timestampDiff} at Pier 17 is {oxygenText}
    </h1>
  )
}

export default TitleText