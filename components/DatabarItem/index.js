import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import './index.css'

const DatabarItem = ({ label, value, unit, transform }) => (
  <Link href='/data' prefetch>
    <a className='databar__item'>
      <div className='databar__item__label'>{label}</div>
      <div className='databar__item__value'>
        {transform ? transform(value) : value}
        <span className='databar__item__unit'>{unit}</span>
      </div>
    </a>
  </Link>
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
