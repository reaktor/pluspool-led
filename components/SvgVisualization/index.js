import React from 'react'
import PropTypes from 'prop-types'
import { dataValues, scale } from '../../helpers/data'
import './index.css'
import SimplexNoise from 'simplex-noise'

// Seed the noise functions
const simplexNoises = {
  oxygen: new SimplexNoise(1),
  salinity: new SimplexNoise(2.1),
  turbidity: new SimplexNoise(0.4),
  speed: new SimplexNoise(1.5),
  ph: new SimplexNoise(1.2),
  bacteria: new SimplexNoise(-3.4)
}

const SCALE = 100

const displayedSlugs = [
  'oxygen',
  'salinity',
  'turbidity',
  'speed',
  'ph',
  'bacteria'
]

const SvgVisualization = ({
  openTooltip,
  sample
}) => {
  const drawingData = displayedSlugs
    .filter(slug => slug in sample)
    .reduce((acc, slug) => {
      const data = dataValues[slug]
      const { color } = data
      const value = parseFloat(sample[slug])
      const simplex = simplexNoises[slug]

      // Generate a random value for how many circles for each point to draw
      // Eventually this could be derived from turbidity
      const count = Math.floor(
        scale(
          simplex.noise2D(value, -0.4),
          -1,
          1,
          1,
          15
        )
      )

      const array = new Array(count).fill().map((_val, index) => {
        const noiseValue = value + index
        const radius = scale(simplex.noise2D(noiseValue, -2), -1, 1, 0.2, 12)
        const x = scale(simplex.noise2D(noiseValue, 1), -1, 1, -30, 30)
        const y = scale(simplex.noise2D(noiseValue, 16), -1, 1, -20, 20)
        const duration = scale(simplex.noise2D(noiseValue, 3.2), -1, 1, 12, 16)
        const delay = scale(simplex.noise2D(noiseValue, -0.8), -1, 1, 6, 12)
        const distance = scale(simplex.noise2D(noiseValue, 1.5), -1, 1, 10, 50)

        return {
          slug,
          radius,
          x,
          y,
          color,
          duration,
          delay,
          distance
        }
      })

      return [...array, ...acc]
    }, [])

  // Sort by radius size. Places larger circles in the back, smaller ones in the front
  const drawingDataSorted = [...drawingData].sort((a, b) => {
    return b.radius - a.radius
  })

  const { direction } = sample

  return (
    <div className='svg-visualization'>
      <svg viewBox={`${SCALE / -2} ${SCALE / -2} ${SCALE} ${SCALE}`}>
        <g className='svg-visualization__wrapper' style={{ '--svg--direction': direction }}>
          {drawingDataSorted
            .map(({
              slug,
              x,
              y,
              radius,
              color,
              duration,
              delay,
              distance
            }) => {
              return (
                <g
                  className='svg-visualization__data-point-wrapper'
                  style={{
                    '--transition-distance': `${distance}%`,
                    '--transition-duration': `${duration}s`,
                    '--transition-delay': `${delay}s`,
                    '--circle--cx': `${x}px`,
                    '--circle--cy': `${y}px`
                  }}
                >
                  <circle
                    className='svg-visualization__data-point'
                    data-slug={slug}
                    key={slug}
                    cx={x}
                    cy={y}
                    r={radius}
                    fill={color}
                    onClick={() => openTooltip(slug)}
                  />
                </g>
              )
            })}
        </g>
      </svg>
    </div>
  )
}

SvgVisualization.defaultProps = {
  setTooltipSlug: () => {},
  setTooltipOpen: () => {},
  sample: {}
}

SvgVisualization.propTypes = {
  setTooltipSlug: PropTypes.func,
  setTooltipOpen: PropTypes.func,
  sample: PropTypes.object
}

export default SvgVisualization
