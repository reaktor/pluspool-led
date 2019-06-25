const ENDPOINTS = {
  datagarrison: 'https://reaktor.github.io/pluspool-led-api/351579054854805_live.txt',
  noaaCurrent: 'https://tidesandcurrents.noaa.gov/api/datagetter?date=recent&station=n03020&product=currents&units=english&time_zone=gmt&&format=json'
}

const PI = Math.PI.toFixed(4)

const COLORS = {
  darkBlue: '#0073E5',
  lightBlue: '#00E7D8',
  black: '#1D1D1D',
  purple: '#F900FD',
  gray: '#C9C9C9',
  yellow: '#FEAA46'
}

const ICON_SIZE = 65

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

export { DIRECTIONS, ENDPOINTS, PI, COLORS, ICON_SIZE }
