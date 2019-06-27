import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import PaperAnimation from '../PaperAnimation'
import './index.css'

const Visualization = ({
  setTooltipKey,
  setTooltipOpen,
  sample
}) => {
  const wrapper = useRef(null)
  const paperAnimation = useRef(null)

  const initPaperAnimation = () => {
    paperAnimation.current = new PaperAnimation({
      wrapper: wrapper.current,
      onIconClick: ({ icon }) => {
        setTooltipKey(icon)
        setTooltipOpen(true)
        // setTooltipPosition(point)
      }
    })
  }

  const updatePaperAnimation = () => {
    paperAnimation.current.updateProps({ sample })
  }

  useEffect(initPaperAnimation, [])
  useEffect(updatePaperAnimation, [sample])

  return (
    <div ref={wrapper} className='visualization' />
  )
}

Visualization.defaultProps = {
  setTooltipKey: () => {},
  setTooltipOpen: () => {},
  sample: {}
}

Visualization.propTypes = {
  setTooltipKey: PropTypes.func,
  setTooltipOpen: PropTypes.func,
  sample: PropTypes.object
}

export default Visualization
