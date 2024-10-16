const ENDPOINTS = {
  testSamples:
    'https://pluspool-east-river-data.s3.us-east-2.amazonaws.com/sampledata.json',
  samples:
    'https://pluspoolserverlessstack-databucketa7e4f76c-1o43g6j698ys.s3.us-east-2.amazonaws.com/samples.json',
};

const DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const BASE_URL = "https://water.pluspool.org";

const GA_TRACKING_ID = "UA-17668746-5";

const DATE_UNITS = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
};
const DATA_DISCLAIMER =
  'Disclaimer: Data may have missing or incorrect values due to damaged, clogged or non-reporting sensors. Friends of + POOL makes every effort to remedy sensors onsite swiftly when data is not being logged.';

export {
  DIRECTIONS,
  ENDPOINTS,
  BASE_URL,
  GA_TRACKING_ID,
  DATA_DISCLAIMER,
  DATE_UNITS,
};
