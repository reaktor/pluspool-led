import React, { useState } from 'react';
// import fetch from 'isomorphic-unfetch';
import { DATE_UNITS, ENDPOINTS } from '../helpers/constants';
import { downSampleDataForDateRange } from '../helpers/data';

const PageWrapper = (Component) => {
  const wrappedComponent = (props) => <Component {...props} />

  wrappedComponent.displayName = Component.displayName // pass through the displayName to the _app.js
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

    // build out down sampled data for use in pages out of the Date Units object
    const dsSamples = Object.entries(DATE_UNITS).reduce((prevPair, nextPair) => {
      // at start:
      // prevPair empty object
      // nextPair is the first key value pair out of DATE_UNITS obj
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
        //samples: dsSamples[DATE_UNITS.YEAR]
      },
      revalidate: 2
        //60 * 15 // revalidate every 15 minutes
    }
  } catch (err){
    console.log(err)
    throw new Error(`Request rejected with status ${err.status}`)
  }
}

export default PageWrapper