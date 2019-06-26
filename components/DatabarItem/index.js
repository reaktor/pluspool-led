import React from 'react'
import PropTypes from 'prop-types'
import './index.css'

const DatabarItem = ({ label, value, onClick, unit, transform }) => (
  <button className='databar__item' type='button' onClick={onClick}>
    <div className='databar__item__label'>{label}</div>
    <div className='databar__item__value'>
      {transform ? transform(value) : value}
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
