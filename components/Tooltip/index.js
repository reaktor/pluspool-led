import React from 'react'
import TooltipLegend from '../TooltipLegend'
import { dataValues } from '../../helpers/data'
import Circle from '../Circle'

import './index.css'

const Tooltip = ({ closeTooltip, open, slug, sample }) => {
  // Outer div required for CSS transition to occur on first open
  if (!slug) {
    return <div className='tooltip' data-active={open} />
  }

  const content = dataValues[slug]

  const { label, legend, description, unit, transform, color } = content
  const value = transform ? transform(sample[slug]) : sample[slug]

  return (
    <div className='tooltip' data-active={open}>
      <div className='tooltip__inner'>
        <div className='tooltip__close-button-wrapper'>
          <button
            className='tooltip__close-button'
            type='button'
            onClick={closeTooltip}
          >
            <svg viewBox='0 0 10 10' preserveAspectRatio='none'>
              <path
                vector-effect='non-scaling-stroke'
                fill='transparent'
                stroke='#000000'
                stroke-width='1'
                stroke-linejoin='round'
                d='M0,0l10,10' />
              <path
                vector-effect='non-scaling-stroke'
                fill='transparent'
                stroke='#000000'
                stroke-width='1'
                stroke-linejoin='round'
                d='M10,0l-10,10' />
            </svg>
          </button>
        </div>
        <div className='tooltip__heading'>
          <div className='tooltip__icon'>
            <Circle fill={color} />
          </div>
          <h4 className='tooltip__header'>{label}</h4>
          <span className='tooltip__value'>{value} {unit}</span>
        </div>
        {legend && <TooltipLegend legend={legend} />}
        <div className='tooltip__body'>
          {description}
        </div>
      </div>
    </div>
  )
}

export default Tooltip
