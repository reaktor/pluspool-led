import React from 'react';
import cx from 'classnames';
import styles from './Legend.module.css';

const Legend = ({ legend }) => (
  <div className={styles.container}>
    {legend.map(({ value, label, isMax }, index) => (
      <React.Fragment key={`${label}-${index}`}>
        {!isMax && (
          <div className={styles.legendItem}>
            <div className={styles.arrowValue}>
              <div className={styles.value}>
                <span>{value}</span>
              </div>
              <div className={styles.arrow}>
                <svg viewBox='0 -5 10 10' preserveAspectRatio='none'>
                  <path
                    vectorEffect='non-scaling-stroke'
                    fill='transparent'
                    stroke='currentColor'
                    strokeWidth='1'
                    strokeLinejoin='miter'
                    d='M0,0L10,0'
                  />
                </svg>
                <svg viewBox='0 0 10 10' preserveAspectRatio='none'>
                  <path
                    vectorEffect='non-scaling-stroke'
                    fill='currentColor'
                    stroke='currentColor'
                    strokeWidth='1'
                    strokeLinejoin='miter'
                    d='M10,5l-5,-5l0,10Z'
                  />
                </svg>
              </div>
            </div>
            <div className={styles.bar}>
              <svg viewBox='0 0 10 10' preserveAspectRatio='none'>
                <path
                  vectorEffect='non-scaling-stroke'
                  fill='transparent'
                  stroke='currentColor'
                  strokeWidth='1'
                  strokeLinejoin='miter'
                  d='M0,0l0,10l10,0l0,-10'
                />
              </svg>
            </div>
            <div className={styles.label}>{label}</div>
          </div>
        )}
        {index === legend.length - 1 && (
          <div className={cx(styles.legendItem, styles.last)}>
            <div className={styles.arrowValue}>
              <div className={styles.value}>
                {
                  <span>
                    {isMax ? '' : '+'}
                    {value}
                  </span>
                }
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
);

export default Legend;
