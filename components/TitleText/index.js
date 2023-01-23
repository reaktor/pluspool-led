
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Arrow from '../../icons/Arrow'
import content from '../../content'

dayjs.extend(relativeTime)

const levelText = {
  bacteria: (value) => {
    if (value < 35) {
      return content.titleText.bacteriaText.acceptable
    }
    if (value < 104) {
      return content.titleText.bacteriaText.unacceptablePersist
    }

    return content.titleText.bacteriaText.unacceptable
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
          {content.titleText.introText}
        </h1>
        <div className='title-text__button'>
          {content.titleText.introCta}
          <div className='title-text__button__icon'>
            <Arrow />
          </div>
        </div>
      </button>
    )
  }

  const timestampDiff = dayjs().to(timestamp)
  const bacteriaLevel = sample.bacteria
  const bacteriaText = levelText.bacteria(bacteriaLevel)

  return (
    <div className='title-text'>
      <h1 className='title-text__title'>
        {content.titleText.statusText(timestampDiff, bacteriaText)}
      </h1>
    </div>
  )
}

export default TitleText
