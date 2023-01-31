import DownloadIcon from '../../icons/DownloadIcon'
import { ENDPOINTS } from '../../helpers/constants'
import styles from './DownloadData.module.css';

const DownloadData = () => (
  <a href={ENDPOINTS.samples} className={styles.container} aria-label='download data'>
    <span className={styles.label}>Download Data</span>
    <span className={styles.icon}>
      <DownloadIcon />
    </span>
  </a>
);

export default DownloadData