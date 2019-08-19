import React from 'react'

import './index.css'

const TooltipLegend = ({ legend, max }) => (
  <div className='tooltip-legend'>
    {legend.map(({ color, value, label }, index) => (
      <>
        <div className='tooltip-legend__item' style={{ '--color': color }}>
          <div className='tooltip-legend__item__arrow-value'>
            <div className='tooltip-legend__item__value'>
              <span>{value}</span>
            </div>
            <div className='tooltip-legend__item__arrow'>
              <svg viewBox='0 -5 10 10' preserveAspectRatio='none'>
                <path
                  vector-effect='non-scaling-stroke'
                  fill='transparent'
                  stroke='currentColor'
                  stroke-width='1'
                  stroke-linejoin='miter'
                  d='M0,0L10,0' />
              </svg>
              <svg viewBox='0 0 10 10' preserveAspectRatio='none'>
                <path
                  vector-effect='non-scaling-stroke'
                  fill='currentColor'
                  stroke='currentColor'
                  stroke-width='1'
                  stroke-linejoin='miter'
                  d='M10,5l-5,-5l0,10Z' />
              </svg>
            </div>
          </div>
          <div className='tooltip-legend__item__bar'>
            <svg viewBox='0 0 10 10' preserveAspectRatio='none'>
              <path
                vector-effect='non-scaling-stroke'
                fill='transparent'
                stroke='currentColor'
                stroke-width='1'
                stroke-linejoin='miter'
                d='M0,0l0,10l10,0l0,-10' />
            </svg>
          </div>
          <div className='tooltip-legend__item__label'>{label}</div>
        </div>
        {(index === legend.length - 1) && 
          <div className='tooltip-legend__item --last' style={{ '--color': color }}>
            <div className='tooltip-legend__item__arrow-value'>
              <div className='tooltip-legend__item__value'>
                { max ? max : (<span>+{value}</span>)}
              </div>
            </div>
          </div>
        }
      </>
    ))}
  </div>
)

export default TooltipLegend
