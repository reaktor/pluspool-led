import React from 'react'
import Head from 'next/head'
import AboutSection from '../components/AboutSection'
import AboutSignupSection from '../components/AboutSignupSection'
import Navbar from '../components/Navbar'
import { fetchSamplesData } from '../helpers/data'
import './index.css'

const sections = [
  {
    image: 'amoeba-forward@2x.png',
    title: 'Water quality information is pretty complex and hard to digest...',
    body: (
      <p>That’s why we’ve created this dashboard so you can see what’s happening in your river at any given time. Our scientists have combed the data and created a system for understanding when it’s good, when it’s bad, and when it's something in between.</p>
    )
  },
  {
    image: 'amoeba-mission@2x.png',
    title: 'Design has the power to transform communities.',
    body: (
      <p>+ POOL is changing the relationship with the water around us. We have a vision in which people that represent the diversity of New York City are swimming in and around Manhattan safely, enjoying free and safe access to the river.</p>
    ),
    cta: 'Donate to support our work'
  },
  {
    image: 'amoeba-forward@2x.png',
    title: 'Water quality information is pretty complex and hard to digest...',
    body: (
      <p>That’s why we’ve created this dashboard so you can see what’s happening in your river at any given time. Our scientists have combed the data and created a system for understanding when it’s good, when it’s bad, and when it's something in between.</p>
    )
  },
  {
    image: 'amoeba-jumpin@2x.png',
    title: 'It’s time to get to know your river better.',
    body: (
      <p>How warm was the water today? What’s turbidity? What’s pH? How is enterococci different from E. coli? Dive into the dashboard and find out!</p>
    ),
    cta: 'Got to the Dashboard'
  }
]

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <main className='page' data-template='about'>
        <Head>
          <title>+POOL Lights</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link rel='shortcut icon' href='/static/favicon.ico' />
          <link
            href='https://fonts.googleapis.com/css?family=IBM+Plex+Mono&display=swap'
            rel='stylesheet'
          />
        </Head>
        <div className='page__body'>
          {sections.map((section, index) => (
          <>
            <AboutSection side={index % 2 === 0 ? 'left' : 'right'} {...section} />
            {index === 2 && (
              <AboutSignupSection title='Join the movement!' cta='Sign up for our newsletter' />
            )}
          </>
          ))}
        </div>
      </main>
    </>
  )
}

AboutPage.getInitialProps = fetchSamplesData

export default AboutPage
