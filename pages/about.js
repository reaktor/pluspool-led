import React from 'react'
import AboutSection from '../components/AboutSection'
import content from '../content'

const AboutPage = () => {
  const aboutSection = (section, index) => (
    <React.Fragment key={`about-section-${index}`}>
      <AboutSection side={index % 2 === 0 ? 'left' : 'right'} {...section} />
    </React.Fragment>
  )

  return (
    <main className='page' data-template='about'>
      {content.about.sections.map(aboutSection)}
      <section className='about-credits'>
        <div className='about-credits__wrapper'>
          {content.about.credits}
        </div>
      </section>
    </main>
  )
}

AboutPage.displayName = 'AboutPage'

export default AboutPage
