import React from 'react';
import styles from './DataDisclaimer.module.css';
import { DATA_DISCLAIMER } from '../../helpers/constants';

const DataDisclaimer = () => {
  return (
    <div className={styles.container}>
      <p role="note" className={styles.note}>{DATA_DISCLAIMER}</p>
    </div>
  )
}

export default DataDisclaimer;