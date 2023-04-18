import ReloadIcon from '../../icons/Reload';
import React from 'react';
import { useRouter } from 'next/router';
import styles from './ReloadButton.module.css';

const ReloadButton = () => {
  const router = useRouter();

  const onRefreshClick = () => {
    router.reload();
  };

  return (
    <button aria-label="refresh data" onClick={onRefreshClick} className={styles.reloadButton}>
      <span>
        <ReloadIcon/>
      </span>
    </button>
  );
};

export default ReloadButton;