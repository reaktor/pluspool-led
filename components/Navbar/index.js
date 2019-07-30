import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CurvedArrow from '../../icons/CurvedArrow'
import './index.css'

const Navbar = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState()

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='navbar' data-is-open={isOpen}>
      <div className='navbar__inner'>
        <h1 className='navbar__title'>
          <Link href='/'>
            <a className='navbar__title__link'>
              <div className='navbar__logo'>
                <span className='navbar__logo__text'>+ POOL</span>
              </div>
              <span className='u-hide-mobile'>
                Water Quality Dashboard
              </span>
            </a>
          </Link>
        </h1>
        <button
          className='navbar__toggle'
          type='button'
          onClick={() => toggleIsOpen()}
        >
          <svg viewBox='0 0 30 10' className='navbar__toggle__icon'>
            <line
              className='navbar__toggle__line --first'
              x1='0' y1='0'
              x2='30' y2='0'
              stroke='#000000'
              stroke-width='1'
              vector-effect='non-scaling-stroke'
              style={{
                '--navbar__toggle__line--center-x': '15px',
                '--navbar__toggle__line--center-y': '0px'
              }}
            />
            <line
              className='navbar__toggle__line --second'
              x1='0' y1='10'
              x2='30' y2='10'
              stroke='#000000'
              stroke-width='1'
              vector-effect='non-scaling-stroke'
              style={{
                '--navbar__toggle__line--center-x': '15px',
                '--navbar__toggle__line--center-y': '10px'
              }}
            />
          </svg>
        </button>
        <nav className='navbar__nav'>
          <Link href='/'>
            <a className='navbar__nav__link' data-active={router.pathname === '/'} onClick={() => setIsOpen(false)}>Dashboard</a>
          </Link>
          <Link href='/data'>
            <a className='navbar__nav__link' data-active={router.pathname === '/data'} onClick={() => setIsOpen(false)}>Data</a>
          </Link>
          <Link href='/about'>
            <a className='navbar__nav__link' data-active={router.pathname === '/about'} onClick={() => setIsOpen(false)}>About</a>
          </Link>
          <Link href='https://pluspool.org'>
            <a className='navbar__nav__link' onClick={() => setIsOpen(false)}>
              What is + POOL?
              <div className='navbar__nav__link__icon'><CurvedArrow /></div>
            </a>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
