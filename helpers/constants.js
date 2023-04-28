const ENDPOINTS = {
  samples:'https://pluspool-east-river-data.s3.us-east-2.amazonaws.com/2020-04-30T00%3A00%3A46.330Z.json'
}

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

const BASE_URL = 'https://water.pluspool.org'

const GA_TRACKING_ID = 'UA-17668746-5'

const DATE_UNITS = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year'
}
const DATA_DISCLAIMER = 'Disclaimer: Down sampled data may have missing or incorrect values due to possible issues such as a damaged, clogged or non-reporting sensor.'

export { DIRECTIONS, ENDPOINTS, BASE_URL, GA_TRACKING_ID, DATA_DISCLAIMER, DATE_UNITS }

