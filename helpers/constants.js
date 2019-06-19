const ENDPOINTS = {
  datagarrison: 'https://datagarrison.com/users/1105898/351579054854805/temp/351579054854805_live.txt',
  noaaCurrent:
    'https://tidesandcurrents.noaa.gov/api/datagetter?date=recent&station=n03020&product=currents&units=english&time_zone=gmt&&format=json'
}

const PI = Math.PI.toFixed(4)

const COLORS = {
  darkBlue: '#0073E5',
  lightBlue: '#00E7D8',
  black: '#000000',
  purple: '#F900FD',
  gray: '#C9C9C9',
  yellow: '#FEAA46'
}

// WAVES
const POINTS = 10
const WAVE_SPEED = 20
const WAVE_HEIGHT = 30

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

export { DIRECTIONS, ENDPOINTS, PI, COLORS, POINTS, WAVE_HEIGHT, WAVE_SPEED }
