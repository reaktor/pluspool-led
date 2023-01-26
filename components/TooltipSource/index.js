
import QuestionMark from '../../icons/QuestionMark'
import styles from './TooltipSource.module.css';

const TooltipSource = ({ source }) =>
  source && (
    <>
      <div className={styles.container}>
        <div className={styles.questionMark}>
          <QuestionMark />
        </div>
        <div>
          <div className={styles.sourceLabel}>We got this data from:</div>
          <a className={styles.sourceLink} href={source}>
            {source}
          </a>
        </div>
      </div>
    </>
  );

export default TooltipSource
