import { DATE_UNITS } from '../../helpers/constants';
import styles from './GraphsDateFilter.module.css';

const GraphsDateFilter = ({ name, units, activeDateFilter, onChange }) => {
  const innerOnChange = ({ target: { value } }) => onChange(value);

  const choiceToLabel = (choice) => {
    switch (choice) {
      case DATE_UNITS.DAY:
        return 'Day';
      case DATE_UNITS.WEEK:
        return 'Week';
      case DATE_UNITS.MONTH:
        return 'Month';
      case DATE_UNITS.YEAR:
        return 'Year';
      default:
        return 'Select Date Range';
    }
  };

  return (
    <span className={styles.container} role='radiogroup'>
      {units.map((unit) => (
        <DateFilter
          key={unit}
          name={name}
          unit={unit}
          activeDateFilter={activeDateFilter}
          label={choiceToLabel(unit)}
          onChange={innerOnChange}
        />
      ))}
    </span>
  );
};
const DateFilter = ({ name, unit, activeDateFilter, label, onChange }) => {
  return (
    <div>
      <input
        className={styles.input}
        type='radio'
        id={unit}
        name={name}
        value={unit}
        onChange={onChange}
        checked={activeDateFilter === unit}
        aria-checked={activeDateFilter === unit}
      />
      <label className={styles.label} htmlFor={unit}>
        {label}
      </label>
    </div>
  );
};

export default GraphsDateFilter;