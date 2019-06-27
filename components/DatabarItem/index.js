import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

const DatabarItem = ({ icon, color, label, value, onClick, unit, transform }) => (
  <button className='databar__item' type='button' onClick={onClick}>
    <div className='databar__item__icon' style={{ color }}>{icon}</div>
    <div className='databar__item__label'>{label}</div>{' '}
    <div className='databar__item__value'>
      {transform ? transform(value) : value}&thinsp;
      <span className='databar__item__unit'>{unit}</span>
    </div>
  </button>
)

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
