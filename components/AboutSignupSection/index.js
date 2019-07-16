import React from 'react'

import './index.css'

const AboutSignupSection = ({ title, cta }) => (
  <div className='about-section about-signup-section'>
    <div className='about-signup-section__text'>
      <h2 className='about-section__title'>{ title }</h2>
    </div>
    <div className='about-section__cta'>
      { cta }
    </div>
  </div>
)

export default AboutSignupSection
