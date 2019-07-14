import React from 'react'
import PropTypes from 'prop-types'
import Arrow from '../../icons/Arrow'
import Circle from '../../icons/Circle'

import './index.css'

const DatabarItem = ({ onClick, color, label, value, unit, transform }) => (
  <button className='databar__item' onClick={onClick}>
    <div className='databar__item__wrapper'>
      <div className='databar__item__icon'><Circle fill={color} /></div>
      <div className='databar__item__label'>{label}</div>
      <div className='databar__item__value'>
        {transform ? transform(value) : value}
      </div>
      <div className='databar__item__unit'>{unit}</div>
      <div className='databar__item__link'>
        <Arrow />
      </div>
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
