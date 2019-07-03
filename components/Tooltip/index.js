import React from 'react'
import Link from 'next/link'
import { dataValues } from '../../helpers/data'
import Circle from '../Circle'

import './index.css'

const Legend = ({ legend }) => (
  <table className='tooltip__legend'>
    <tbody>
      {legend.map(({ color, value, label }) => (
        <tr style={{ backgroundColor: color }}>
          <td>{value}</td>
          <td>{label}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

const Tooltip = ({ closeTooltip, open, position: { x, y }, slug }) => {
  if (!slug) return null
  const content = dataValues[slug]
  const { label, legend, description, color } = content

  return (
    <div className='tooltip-wrapper'>
      <div className='tooltip' data-active={open}>
        <button
          className='tooltip__close-button'
          type='button'
          onClick={closeTooltip}
        >&times;</button>
        <div className='tooltip__icon' style={{ color }}>
          <Circle fill={color} />
        </div>
        <h4 className='tooltip__header'>{label}</h4>
        {legend && <Legend legend={legend} />}
        <div className='tooltip__body'>
          {description}
        </div>
        <Link href='/data'>
          <a className='tooltip__link'>View the data</a>
        </Link>
      </div>
    </div>
  )
}

export default Tooltip
