
import './index.css'

const Circle = ({ fill }) => {
  return (
    <div className='circle'>
      <svg viewBox='-5 -5 10 10'>
        <circle cx='0' cy='0' r='5' fill={fill} />
      </svg>
    </div>
  )
}

export default Circle
