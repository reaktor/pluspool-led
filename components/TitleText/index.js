import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './index.css'

dayjs.extend(relativeTime)

const levelText = {
  bacteria: (value) => {
    if (value < 35) {
      return 'acceptable to swim in.'
    }
    if (value < 104) {
      return 'unnacceptable to swim in if levels persist.'
    }

    return 'unnacceptable to swim in.'
  }
}

function TitleText ({ timestamp, sample }) {
  const timestampDiff = dayjs().subtract(5, 'hours').to(timestamp)
  const bacteriaLevel = sample.bacteria
  const bacteriaText = levelText.bacteria(bacteriaLevel)

  return (
    <h1 className='title-text'>
      The water {timestampDiff} at Pier 17 was {bacteriaText}
    </h1>
  )
}

export default TitleText
