import React from 'react'
import './index.css'

const Spinner = ({ centered }) => {
  return <div className={`pluspool-spinner ${centered ? 'center' : ''}`} />
}

export default Spinner
