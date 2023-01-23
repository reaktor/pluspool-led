
import Tippy from '@tippy.js/react'
import Legend from '../Legend'
import TooltipSource from '../TooltipSource'
import content from '../../content'
import ExclamationCircle from '../../icons/ExclamationCircle'
import X from '../../icons/X'

import './index.css'

const renderValue = (slug, sample, units, dataPoint) => {
  const unit = units[slug]
  const { showNumber, interperet } = dataPoint
  const value = sample[slug]

  if (showNumber === false) {
    return interperet(value)
  }

  return `${value} ${unit}`
}

const Tooltip = ({ closeTooltip, open, slug, sample, sources, units }) => {
  // We need to render our containing div even when no slug in order for transition in to work
  if (!slug) {
    return <div className='tooltip' data-active={open} />
  }

  const source = sources[slug]
  const dataPoint = content.dataPoints[slug]
  const { label, legend, disclaimerText } = dataPoint

  return (
    <div className='tooltip' data-active={open}>
      <div className='tooltip__inner'>
        {/* This div is needed to solve some flexbox issues. Flex children inside of .tooltip__inner were having height 0px in mobile. */}
        <div>
          <div className='tooltip__close-button-wrapper'>
            <button
              className='tooltip__close-button'
              type='button'
              onClick={closeTooltip}
            >
              <X />
            </button>
          </div>
          <div className='tooltip__heading'>
            <h3 className='tooltip__header'>{label}</h3>
            {disclaimerText &&
              <Tippy
                content={disclaimerText}
                placement='bottom'
                maxWidth={285}
                trigger='click'
              >
                <button class='tooltip__disclaimer'>
                  <ExclamationCircle />
                </button>
              </Tippy>}
            {sample && <span className='tooltip__value'>{renderValue(slug, sample, units, dataPoint)}</span>}
          </div>
        </div>
        {legend && (
          <div className='tooltip__legend'>
            <Legend legend={legend} />
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
