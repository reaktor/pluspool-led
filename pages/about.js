import React from 'react'
import AboutSection from '../components/AboutSection'
import './index.css'

const AboutPage = () => {
  const aboutSection = (section, index) => (
    <>
      <AboutSection side={index % 2 === 0 ? 'left' : 'right'} {...section} />
    </>
  )

  return (
    <main className='page' data-template='about'>
      { content.about.sections.map(aboutSection) }
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
