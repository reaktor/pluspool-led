import React from 'react'
import Legend from '../Legend'
import TooltipSource from '../TooltipSource'
import content from '../../content'
import Circle from '../../icons/Circle'

import './index.css'

const Tooltip = ({ closeTooltip, open, slug, sample, sources, units }) => {
  // Outer div required for CSS transition to occur on first open
  if (!slug) {
    return <div className='tooltip' data-active={open} />
  }

  const [source, unit] = [ sources[slug], units[slug] ]
  const { label, legend, transform, color, max } = content.dataPoints[slug]

  const value = sample ? transform ? transform(sample[slug]) : sample[slug] : null

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
          {color && <div className='tooltip__icon'>
            <Circle fill={color} />
          </div>}
          <h3 className='tooltip__header'>{label}</h3>
          {value && <span className='tooltip__value'>{value} {unit}</span>}
        </div>
        {legend && (
          <div className='tooltip__legend'>
            <Legend legend={legend} max={max} />
          </div>
        )}
        <div className='tooltip__body'>
          {content.tooltip[slug]}
        </div>
        <TooltipSource source={source} />
      </div>
    </div>
  )
}

export default Tooltip
