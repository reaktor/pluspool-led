import { DATE_UNITS, ENDPOINTS } from '../helpers/constants';
import { downSampleDataForDateRange } from '../helpers/data';

const PageWrapper = (Component) => {
  const wrappedComponent = (props) => <Component {...props} />;

  wrappedComponent.displayName = Component.displayName; // pass through the displayName to the _app.js
  return wrappedComponent;
};

/**
 * A function that creates a closure which allows to access params within Next.js getStaticProps out of its scope
 * @param page - page name
 * @returns {(function(*): Promise<{revalidate, props: *&{[p: number]: any, [p: symbol]: any}}|undefined>)|*} getStaticProps
 */
export const getPageData = (page) => {
  //this function will be the getStaticProps
  return async (context) => {

    console.log(page); //currently just logs the page name, but can be used to dynamically change what happens during getStaticProps

    const dataFetchParams = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'Accept-Encoding': 'gzip' }
      // referrer: 'no-referrer'
    };

    try {
      const response = await fetch(ENDPOINTS.samples, dataFetchParams);
      const data = await response.json();

      const latestSampleTimestamp = data.samples[data.samples.length - 1].noaaTime;

      // build out down sampled data for use in pages out of the Date Units object
      const dsSamples = Object.entries(DATE_UNITS).reduce((prevPair, nextPair) => {
        // at start:
        // prevPair empty object
        // nextPair is the first key value pair out of DATE_UNITS obj
        return {
          ...prevPair,
          [nextPair[1]]: downSampleDataForDateRange(latestSampleTimestamp, nextPair[1], data.samples)
        };
      }, {});

      const { samples, ...pageProps } = data;

      return {
        props: {
          ...pageProps,
          ...dsSamples,
          //samples: data.samples //non-sampled data
          //samples: dsSamples[DATE_UNITS.YEAR]
        },
        revalidate: 60 * 15 // revalidate every 15 minutes
      };
    } catch (err) {
      console.log(err);
      throw new Error(`Request rejected with status ${err.status}`);
    }
  };
};

export default PageWrapper;