import React from 'react'
import Link from 'next/link'
import { dataValues } from '../../helpers/data'
import { ICON_SVG_PATHS } from '../../helpers/constants'

import './index.css'

const generateTooltipObject = ({ label, description }) => ({
  header: label,
  body: description
})

const contents = {
  bacteria: generateTooltipObject(dataValues.bacteria),
  direction: generateTooltipObject(dataValues.direction),
  oxygen: generateTooltipObject(dataValues.oxygen),
  salinity: generateTooltipObject(dataValues.salinity),
  speed: generateTooltipObject(dataValues.speed),
  turbidity: generateTooltipObject(dataValues.turbidity),
  ph: generateTooltipObject(dataValues.ph)
}

const Tooltip = ({ closeTooltip, open, position: { x, y }, tooltipKey }) => {
  if (!tooltipKey) return null
  const content = contents[tooltipKey]
  const { header, body } = content
  const svgPath = ICON_SVG_PATHS[tooltipKey]

  return (
    <div className='tooltip-wrapper'>
      <div className='tooltip' data-active={open}>
        <button
          className='tooltip__close-button'
          type='button'
          onClick={closeTooltip}
        >&times;</button>
        <img src={svgPath} alt={`${header} icon`} />
        <h4 className='tooltip__header'>{header}</h4>
        <div className='tooltip__body'>
          {body}
        </div>
        <Link href='/data'>
          <a className='tooltip__link'>View the data</a>
        </Link>
      </div>
    </div>
  )
}

export default Tooltip
