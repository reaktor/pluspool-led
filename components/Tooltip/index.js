import React from 'react'
import Link from 'next/link'
import { dataValues } from '../../helpers/data'
import { ICON_SVG_PATHS } from '../../helpers/constants'

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

const Tooltip = ({ closeTooltip, open, position: { x, y }, tooltipKey }) => {
  if (!tooltipKey) return null
  const content = dataValues[tooltipKey]
  const { label, legend, description } = content
  const svgPath = ICON_SVG_PATHS[tooltipKey]

  return (
    <div className='tooltip-wrapper'>
      <div className='tooltip' data-active={open}>
        <button
          className='tooltip__close-button'
          type='button'
          onClick={closeTooltip}
        >&times;</button>
        <img src={svgPath} alt={`${label} icon`} />
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
