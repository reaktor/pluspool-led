import React from 'react'
import './index.css'

/**
 * Animated Spinner Component that has a default lg size
 * Params:
 * @param {boolean} centered - absolutely center the spinner
 * @param {string} [size] - 'md' or 'sm'.
 */
const Spinner = ({ centered, size }) => {
  return (
    <div
      className={`spinner 
      ${centered ? 'center' : ''} 
      ${size === 'md' ? 'size-md' : size === 'sm' ? 'size-sm' : ''}
    `}
    />
  )
}

export default Spinner
