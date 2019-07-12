import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Arrow from '../../icons/Arrow'
import './index.css'

const Navbar = () => {
  const router = useRouter()

  return (
    <div className='navbar'>
      <h1 className='navbar__title'>
        <Link href='/'>
          <a className='navbar__title__link'><strong>+POOL</strong> Water Quality Dashboard</a>
        </Link>
      </h1>
      <div>
        <nav className='navbar__nav'>
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
            <a className='navbar__nav__link'>What is +POOL? <Arrow /></a>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
