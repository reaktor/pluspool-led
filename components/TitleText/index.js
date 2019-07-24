import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Arrow from '../../icons/Arrow'
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

function TitleText ({ pageState, timestamp, sample, onClick }) {
  if (pageState === 0) {
    return (
      <button
        className='title-text'
        type='button'
        onClick={onClick}
      >
        <h1 className='title-text__title'>
          How is the water today at East River, Manhattan?
        </h1>
        <div className='title-text__button'>
          Find out
          <div className='title-text__button__icon'>
            <Arrow />
          </div>
        </div>
      </button>
    )
  }

  const timestampDiff = dayjs().subtract(5, 'hours').to(timestamp)
  const bacteriaLevel = sample.bacteria
  const bacteriaText = levelText.bacteria(bacteriaLevel)

  return (
    <div className='title-text'>
      <h1 className='title-text__title'>
        The water {timestampDiff} at Pier 17 was {bacteriaText}
      </h1>
    </div>
  )
}

export default TitleText
