import React from 'react'

import './index.css'

const AboutSection = ({ side, image, title, body, cta }) => (
  <div className='about-section' data-side={side}>
    <div className='about-section__image'>
      <img src={`/static/img/about/${image}`} alt='' />
    </div>
    <div className='about-section__text'>
      <h2 className='about-section__title'>{ title }</h2>
      <div className='about-section__body'>
        {body}
      </div>
      { cta }
    </div>
  </div>
)

export default AboutSection
