
import PropTypes from 'prop-types'
import Arrow from '../../icons/Arrow'
import styles from './DatabarItem.module.css';

const DatabarItem = ({ onClick, label, value, unit, interperet }) => {
  const displayValue = interperet ? interperet(value) : `${value} ${unit}`;

  return (
    <button className={styles.container} onClick={onClick}>
      <div className={styles.grid}>
        <div className={styles.label}>{label}</div>
        <div className={styles.unit}>{displayValue}</div>
        <div className={styles.link}>
          {' '}
          <Arrow />
        </div>
      </div>
    </button>
  );
};

DatabarItem.defaultProps = {
  transform: null
}

DatabarItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  unit: PropTypes.string.isRequired,
  transform: PropTypes.func
}

export default DatabarItem
