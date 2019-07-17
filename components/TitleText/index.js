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

const getPageText = ({ pageState, timestamp, sample }) => {
  if (pageState === 0) {
    return 'Welcome to our dashboard. Click me to proceed.'
  }

  if (pageState === 1) {
    return 'This is a data scrubber. Click to proceed.'
  }

  const timestampDiff = dayjs().subtract(5, 'hours').to(timestamp)
  const bacteriaLevel = sample.bacteria
  const bacteriaText = levelText.bacteria(bacteriaLevel)

  return `The water ${timestampDiff} at Pier 17 was ${bacteriaText}`
}

function TitleText ({ onClick, ...rest }) {
  return (
    <h1 className='title-text'>
      <button type='button' onClick={onClick}>
        {getPageText(rest)}
      </button>
    </h1>
  )
}

export default TitleText
