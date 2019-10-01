import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import content from '../../content'
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
                <span className='navbar__logo__text'>{content.nav.titleName}</span>
              </div>
              <span className='u-hide-mobile'>
                {content.nav.titleDescription}
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
          {
            content.nav.links.map(({ label, pathname, icon }) => (
              <Link href={pathname} key={pathname}>
                <a
                  className='navbar__nav__link'
                  data-active={router.pathname === pathname}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                  {icon && <div className='navbar__nav__link__icon'>{icon}</div>}
                </a>
              </Link>
            ))
          }
        </nav>
      </div>
    </div>
  )
}

export default Navbar
