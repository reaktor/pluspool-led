import React from 'react'
import Link from 'next/link'
import Arrow from '../../icons/Arrow'
import './index.css'

const Navbar = () => (
  <div className='navbar'>
    <h1 className='navbar__title'>
      <Link href='/'>
        <a className='navbar__title__link'><strong>+POOL</strong> Water Quality Dashboard</a>
      </Link>
    </h1>
    <div>
      <nav className='navbar__nav'>
        <Link href='/'>
          <a className='navbar__nav__link'>Dashboard</a>
        </Link>
        <Link href='/data'>
          <a className='navbar__nav__link'>Data</a>
        </Link>
        <Link href='https://pluspool.org'>
          <a className='navbar__nav__link'>What is +POOL? <Arrow /></a>
        </Link>
      </nav>
    </div>
  </div>
)

export default Navbar
