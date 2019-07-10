import React from 'react'
import Link from 'next/link'
import './index.css'

const Navbar = () => (
  <div className='navbar'>
    <h1 className='navbar__title'>
      <Link href='/'>
        <a className='navbar__title__link'>+ <span className='navbar__title__label'>Pool Water Quality Dashboard</span></a>
      </Link>
    </h1>
    <div className='navbar__link-out'>
      <span className='navbar__link-out__label'>Want to learn more and get involved?{' '}</span>
      <a className='navbar__link-out__link' href='https://pluspool.org' target='_BLANK' rel='noopener'>pluspool.org</a>
    </div>
  </div>
)

export default Navbar
