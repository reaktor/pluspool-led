import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CurvedArrow from '../../icons/CurvedArrow'
import './index.css'

const Navbar = () => {
  const router = useRouter()

  return (
    <div className='navbar'>
      <div className='navbar__inner'>
        <h1 className='navbar__title'>
          <Link href='/'>
            <a className='navbar__title__link'>
              <span className='u-hide-desktop'><strong>+</strong></span>
              <span className='u-hide-mobile'><strong>+POOL</strong> Water Quality Dashboard</span>
            </a>
          </Link>
        </h1>
        <div>
          <nav className='navbar__nav u-hide-mobile'>
            <Link href='/'>
              <a className='navbar__nav__link' data-active={router.pathname === '/'}>Dashboard</a>
            </Link>
            <Link href='/data'>
              <a className='navbar__nav__link' data-active={router.pathname === '/data'}>Data</a>
            </Link>
            <Link href='/about'>
              <a className='navbar__nav__link' data-active={router.pathname === '/about'}>About</a>
            </Link>
            <Link href='https://pluspool.org'>
              <a className='navbar__nav__link'>
                What is +POOL?
                <div className='navbar__nav__link__icon'><CurvedArrow /></div>
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
