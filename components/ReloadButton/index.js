import ReloadIcon from '../../icons/Reload';
import React from 'react';
import { useRouter } from 'next/router';
import styles from './ReloadButton.module.css';

const ReloadButton = () => {
  const router = useRouter();

  const onRefreshClick = (e) => {
    e.target.blur()
    router.reload()
  };

  return (
    <button aria-label="refresh data" onClick={onRefreshClick} className={styles.reloadButton} >
        <ReloadIcon/>
    </button>
  );
};

export default ReloadButton;