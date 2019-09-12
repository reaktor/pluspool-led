import React from 'react'
import './index.css'

const GraphsDateFilter = ({ name, units, activeUnit, onChange }) => {
  const innerOnChange = ({ target: { value } }) => onChange(value)

  const choiceToLabel = choice => {
    switch (choice) {
      case 'day': return 'Today'
      case 'week': return 'Past Week'
      case 'month': return 'Past Month'
      case 'year': return 'Past Year'
      default: return 'Select Date Range'
    }
  }

  return (
    <span className='graphs-date-filter'>
      {units.map(unit => (
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
  )
}
const DateFilter = ({ name, unit, activeUnit, label, onChange }) => {
  return (
    <div className='graphs-date-filter__filter'>
      <input
        className='graphs-date-filter__input'
        type='radio'
        id={unit}
        name={name}
        value={unit}
        onChange={onChange}
        checked={activeUnit === unit}
      />
      <label className='graphs-date-filter__label' for={unit}>
        {label}
      </label>
    </div>
  )
}

export default GraphsDateFilter
