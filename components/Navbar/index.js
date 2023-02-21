'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import content from '../../content';
import cx from 'classnames';
import styles from './Navbar.module.css';

const Navbar = () => {
  const currentPathName = usePathname();
  const [isOpen, setIsOpen] = useState();

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div className={styles.container} data-is-open={isOpen}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          <Link href='/dashboard' className={styles.titleLink}>
            <div className={styles.logo}>
              <span className={styles.logoText}>{content.nav.titleName}</span>
            </div>
            <span className='u-hide-mobile'>
              {content.nav.titleDescription}
            </span>
          </Link>
        </h1>
        <button
          className={styles.toggle}
          type='button'
          onClick={() => toggleIsOpen()}
        >
          <svg viewBox='0 0 30 10' className={styles.toggleIcon}>
            <line
              className={cx(styles.toggleLine, styles.first)}
              x1='0'
              y1='0'
              x2='30'
              y2='0'
              stroke='#000000'
              strokeWidth='1'
              vectorEffect='non-scaling-stroke'
              style={{
                '--toggle__line--center-x': '15px',
                '--toggle__line--center-y': '0px',
              }}
            />
            <line
              className={cx(styles.toggleLine, styles.second)}
              x1='0'
              y1='10'
              x2='30'
              y2='10'
              stroke='#000000'
              strokeWidth='1'
              vectorEffect='non-scaling-stroke'
              style={{
                '--toggle__line--center-x': '15px',
                '--toggle__line--center-y': '10px',
              }}
            />
          </svg>
        </button>
        <nav className={styles.nav}>
          {content.nav.links.map(({ label, pathname, icon }) => (
            <Link
              href={pathname}
              key={pathname}
              className={styles.navLink}
              data-active={ currentPathName === pathname}
              onClick={() => setIsOpen(false)}
            >
              {label}
              {icon && <div className={styles.icon}>{icon}</div>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
