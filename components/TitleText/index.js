import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Arrow from '../../icons/Arrow'
import content from '../../content'
import styles from './TitleText.module.css';

dayjs.extend(relativeTime);

const levelText = {
  bacteria: (value) => {
    if (value < 35) {
      return content.titleText.bacteriaText.acceptable;
    }
    if (value < 104) {
      return content.titleText.bacteriaText.unacceptablePersist;
    }

    return content.titleText.bacteriaText.unacceptable;
  },
};

function TitleText({ showBanner, timestamp, sample, onClick }) {
  if (showBanner) {
    return (
      <button className={styles.container} type='button' onClick={onClick}>
        <h1 className={styles.title}>{content.titleText.introText}</h1>
        <div className={styles.button}>
          {content.titleText.introCta}
          <div className={styles.icon}>
            <Arrow />
          </div>
        </div>
      </button>
    );
  }

  const timestampDiff = dayjs().to(timestamp);
  const bacteriaLevel = sample.bacteria;
  const bacteriaText = levelText.bacteria(bacteriaLevel);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {content.titleText.statusText(timestampDiff, bacteriaText)}
      </h1>
    </div>
  );
}

export default TitleText
