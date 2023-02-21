import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types'
import { scale } from '../../helpers/data'
import content from '../../content'
import { createNoise2D } from 'simplex-noise'
import alea from 'alea'
import styles from './SvgVisualization.module.css';

// Seed the noise functions
const simplexNoises = {
  oxygen: createNoise2D(alea(1)),
  salinity: createNoise2D(alea(2.1)),
  turbidity: createNoise2D(alea(0.4)),
  speed: createNoise2D(alea(1.5)),
  ph: createNoise2D(alea(1.2)),
  bacteria: createNoise2D(alea(-3.4)),
  temperature: createNoise2D(alea(1.7)),
};

const SCALE = 100;

const DRAW_OUT_TOTAL_DURATION = 800;
const DRAW_IN_TOTAL_DURATION = 1400;
const DRAGGING_THROTTLE = DRAW_OUT_TOTAL_DURATION;

const ANIMATION_STATE_IN = 'in';
const ANIMATION_STATE_OUT = 'out';
const ANIMATION_STATE_START = 'start';

const displayedSlugs = [
  'oxygen',
  'temperature',
  'salinity',
  'turbidity',
  'ph',
  'bacteria',
];

const getValues = (sample) => {
  if (!sample) {
    return null;
  }

  return displayedSlugs
    .filter((slug) => slug in sample)
    .reduce((acc, slug) => {
      const data = content.dataPoints[slug];
      const { color } = data;
      const value = parseFloat(sample[slug]);
      const simplex = simplexNoises[slug];

      const array = new Array(3).fill(null).map((_val, index) => {
        const noiseValue = value + index;
        const radius = scale(simplex(noiseValue, -2), -1, 1, 0.2, 17);
        const x = scale(simplex(noiseValue, 1), -1, 1, -50, 50);
        const y = scale(simplex(noiseValue, 16), -1, 1, -35, 35);
        const delay = scale(simplex(noiseValue, -0.8), -1, 1, 0, 0.3);

        return {
          slug,
          radius,
          x,
          y,
          color,
          delay,
        };
      });

      return [...array, ...acc];
    }, []);
};

const SvgVisualization = ({ sample }) => {
  const [drawnSample, setDrawnSample] = useState(sample);
  const [animationState, setAnimationState] = useState(ANIMATION_STATE_START);
  const [drawThrottle, setDrawThrottle] = useState(null);
  const [drawingData, setDrawingData] = useState([]);

  // We need this in a ref in order to grab correct value inside our timeout
  // Without this the timeout would use the sample value from when it was initialized
  const sampleRef = useRef(sample);
  sampleRef.current = sample;

  // const drawingData = getValues(drawnSample);

  //set the drawingData via effect so it doesn't calculate the same values upon re-renders unless drawnSample changes
  useEffect(() => {
    setDrawingData(getValues(drawnSample));
  },  [setDrawingData, drawnSample])

  // When the timestamp of sample changes
  useEffect(() => {
    // clear any existing timeout
    if (drawThrottle) {
      clearTimeout(drawThrottle);
    }

    // trigger an out animation
    if (animationState === ANIMATION_STATE_IN) {
      setAnimationState(ANIMATION_STATE_OUT);
    }

    // start throttle
    setDrawThrottle(
      setTimeout(() => {
        // after our throttle threshold (usually just after a user releases the scrubber)

        // update our drawn samples position
        setDrawnSample(sampleRef.current);

        // trigger an in animation
        setAnimationState(ANIMATION_STATE_IN);
      }, DRAGGING_THROTTLE)
    );
  }, [sample.noaaTime]);

  // memoize the sorted drawing data, so it doesn't re-sort upon re-renders unless drawingData changes
  // Sort by radius size. Places larger circles in the back, smaller ones in the front
  const drawingDataSorted = useMemo(() => {
    return [...drawingData].sort((a, b) => {
      return b.radius - a.radius;
    });
  }, [drawingData])

  return (
    <div className={styles.container} data-animate-state={animationState}>
      <svg viewBox={`${SCALE / -2} ${SCALE / -2} ${SCALE} ${SCALE}`}>
        {drawingDataSorted.map(({ color, slug, x, y, radius, delay }, index) => {
          // Ensure that Duration + Delay = Total Duration
          const animationInDuration = DRAW_IN_TOTAL_DURATION * (1 - delay);
          const animationInDelay = DRAW_IN_TOTAL_DURATION * delay;

          const animationOutDuration = DRAW_OUT_TOTAL_DURATION * (1 - delay);
          const animationOutDelay = DRAW_OUT_TOTAL_DURATION * delay;

          return (
            <g
              key={`${slug}-${index}`}
              className={styles.dataPointPositioningAnimation}
              style={{
                '--data-point--animation-in-duration': `${animationInDuration}ms`,
                '--data-point--animation-in-delay': `${animationInDelay}ms`,
                '--data-point--animation-out-duration': `${animationOutDuration}ms`,
                '--data-point--animation-out-delay': `${animationOutDelay}ms`,
                '--data-point--translate-x': `${x}px`,
                '--data-point--translate-y': `${y}px`,
                '--data-point--scale': `${radius}`,
              }}
            >
              <g className={styles.dataPointBreathingAnimation}>
                <circle r='1' fill={color} />
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

SvgVisualization.defaultProps = {
  sample: {}
}

SvgVisualization.propTypes = {
  sample: PropTypes.object
}

export default SvgVisualization
