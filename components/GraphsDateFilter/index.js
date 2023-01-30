import styles from './GraphsDateFilter.module.css';

const GraphsDateFilter = ({ name, units, activeUnit, onChange }) => {
  const innerOnChange = ({ target: { value } }) => onChange(value);

  const choiceToLabel = (choice) => {
    switch (choice) {
      case 'day':
        return 'Day';
      case 'week':
        return 'Week';
      case 'month':
        return 'Month';
      case 'year':
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
          activeUnit={activeUnit}
          label={choiceToLabel(unit)}
          onChange={innerOnChange}
        />
      ))}
    </span>
  );
};
const DateFilter = ({ name, unit, activeUnit, label, onChange }) => {
  return (
    <div>
      <input
        className={styles.input}
        type='radio'
        id={unit}
        name={name}
        value={unit}
        onChange={onChange}
        checked={activeUnit === unit}
        aria-checked={activeUnit === unit}
      />
      <label className={styles.label} htmlFor={unit}>
        {label}
      </label>
    </div>
  );
};

export default GraphsDateFilter;