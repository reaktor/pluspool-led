import React from 'react'

import './index.css'

const AboutSignupSection = ({ title, cta }) => (
  <div className='about-signup-section'>
    <div className='about-signup-section__text'>
      <h2 className='about-signup-section__title'>{ title }</h2>
    </div>
    <div className='about-signup-section__cta'>
      { cta }
    </div>
  </div>
)

export default AboutSignupSection
