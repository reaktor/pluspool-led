'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import content from '../../content';
import cx from 'classnames';
import styles from './Navbar.module.css';

const Navbar = () => {
  const currentPathName = usePathname();
  const [linkName, setLinkName] = useState();
  const [isOpen, setIsOpen] = useState();

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };



  //execute when currentPathName from next.js or linkName changes
  useEffect(() => {
    //if next.js currentPath name now matches the set linkName, close the navbar in mobile viewport
    //especially helps if the component within a route segment isn't ready to render yet
    if(currentPathName === linkName) {
      setIsOpen(false)
    }
  }, [currentPathName, linkName, setIsOpen]);


  //set current link name
  const onNavClick = (e) => {
    setLinkName(e.target.getAttribute('data-name'))
    //   setIsOpen(false)
  }

  return (
    <div className={styles.container} data-is-open={isOpen}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          <Link href='/' className={styles.titleLink} data-name={content.nav.links[0].pathname}>
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
              data-name={pathname}
              className={styles.navLink}
              data-active={ currentPathName === pathname}
              onClick={onNavClick}
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
