const CloseCircle = () => {
  return (
    <div className='close-circle'>
      <svg viewBox='-5 -5 10 10'>
        <circle cx='0' cy='0' r='5' fill='#000000' />
        <line
          x1='-2'
          y1='-2'
          x2='2'
          y2='2'
          stroke='#FFFFFF'
          strokeWidth='1'
          vector-effect='non-scaling-stroke'
        />
        <line
          x1='2'
          y1='-2'
          x2='-2'
          y2='2'
          stroke='#FFFFFF'
          strokeWidth='1'
          vector-effect='non-scaling-stroke'
        />
      </svg>
    </div>
  );
}

export default CloseCircle
