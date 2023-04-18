import React, { useState } from 'react';
// import fetch from 'isomorphic-unfetch';
import { DATE_UNITS, ENDPOINTS } from '../helpers/constants';
import { before, cutData, downsampleData, downSampleDataForDateRange } from '../helpers/data';

const PageWrapper = (Component) => {
  const wrappedComponent = (props) => <Component {...props} />

  return wrappedComponent
}


export const getStaticProps = async () => {
  const dataFetchParams = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', 'Accept-Encoding': 'gzip' }
    // referrer: 'no-referrer'
  }

  try {
    const response = await fetch(ENDPOINTS.samples, dataFetchParams)
    const data = await response.json()

    const latestSampleTimestamp = data.samples[data.samples.length -1].noaaTime

    // const pageData = {
    //   [DATE_UNITS.DAY]: downSampleDataForDateRange(latestSampleTimestamp, DATE_UNITS.DAY, data.samples),
    //   [DATE_UNITS.WEEK]: downSampleDataForDateRange(latestSampleTimestamp, DATE_UNITS.WEEK, data.samples),
    //   [DATE_UNITS.MONTH]: downSampleDataForDateRange(latestSampleTimestamp, DATE_UNITS.MONTH, data.samples),
    //   [DATE_UNITS.YEAR]: downSampleDataForDateRange(latestSampleTimestamp, DATE_UNITS.YEAR, data.samples)
    // }

    // build out down sampled data for use in pages out of the Date Units object
    const dsSamples = Object.entries(DATE_UNITS).reduce((prevPair, nextPair) => {
      return {
        ...prevPair,
        [nextPair[1]]: downSampleDataForDateRange(latestSampleTimestamp, nextPair[1], data.samples)
      }
    }, {})


    const { samples, ...pageProps} = data;

    return {
      props: {
        ...pageProps,
        ...dsSamples,
        // samples: dsSamples[DATE_UNITS.YEAR]
      },
      revalidate: 60 * 15 // revalidate every 15 minutes
    }
  } catch (err){
    console.log(err)
    throw new Error(`Request rejected with status ${err.status}`)
  }
}

export default PageWrapper