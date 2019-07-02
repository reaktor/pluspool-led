const ENDPOINTS = {
  datagarrison: 'https://reaktor.github.io/pluspool-led-api/351579054854805_live.txt',
  noaaCurrent: 'https://tidesandcurrents.noaa.gov/api/datagetter?range=2400&station=n03020&product=currents&units=english&time_zone=gmt&&format=json'
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
