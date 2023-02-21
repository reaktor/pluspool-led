import styles from './ProgressBar.module.css';

/**
 * Animated Progress Bar Component
 * taking up full width of its parent component
 * up to the max width of the website
 */
const ProgressBar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bar} />
    </div>
  );
};

export default ProgressBar;
