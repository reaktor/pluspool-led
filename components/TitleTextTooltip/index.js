
import Tippy from '@tippy.js/react'
import ExclamationCircle from '../../icons/ExclamationCircle'
import styles from './TitleTextTooltip.module.css';

const TitleTextTooltip = ({ children, tooltipText }) => (
  <Tippy
    content={tooltipText}
    placement='bottom'
    maxWidth={285}
    trigger='click'
  >
    <button className={styles.container}>
      {children}
      <div className={styles.icon}>
        <ExclamationCircle />
      </div>
    </button>
  </Tippy>
);

export default TitleTextTooltip
