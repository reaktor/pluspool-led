const ENDPOINTS = {
  samples: 'https://pluspool.s3.amazonaws.com/samples.json'
}

const ICON_SVG_PATHS = {
  bacteria: '/static/img/icons/bacteria.svg',
  direction: '/static/img/icons/direction.svg',
  oxygen: '/static/img/icons/oxygen.svg',
  salinity: '/static/img/icons/salinity.svg',
  speed: '/static/img/icons/speed.svg',
  turbidity: '/static/img/icons/turbidity.svg',
  ph: '/static/img/icons/oxygen.svg'
}

const PI = Math.PI.toFixed(4)

const ICON_SIZE = 65

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

export { DIRECTIONS, ENDPOINTS, PI, ICON_SIZE, ICON_SVG_PATHS }
