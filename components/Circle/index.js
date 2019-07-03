import React from 'react'

const Circle = ({ fill }) => {
  return (
    <div className='circle'>
      <svg viewBox='0 0 10 10'>
        <circle cx='5' cy='5' r='5' fill={fill} />
      </svg>
    </div>
  )
}

export default Circle
