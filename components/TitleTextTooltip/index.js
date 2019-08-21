import React from 'react'
import Tippy from '@tippy.js/react'
import ExclamationCircle from '../../icons/ExclamationCircle'
import './index.css'

const TitleTextTooltip = ({ children, tooltipText }) => (
  <Tippy
    content={tooltipText}
    placement='bottom'
    maxWidth={285}
    trigger='click'
  >
    <button className='title-text-tooltip'>
      {children}
      <div className='title-text-tooltip__icon'>
        <ExclamationCircle />
      </div>
    </button>
  </Tippy>
)

export default TitleTextTooltip
