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

    console.log(page); // currently just logs the page name, but can be used to dynamically change what happens during getStaticProps

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
        // nextPair[1] = value of the current DATE_UNITS[key]
        return {
          ...prevPair,
          [nextPair[1]]: downSampleDataForDateRange(latestSampleTimestamp, nextPair[1], data.samples)
        };
      }, {});

      // omit unsampled data and use down sampled data, instead
      const { samples, ...pageProps } = data;

      // potential TODO:
      // look into returning only a day of sampled data to the index page, so it's not burdened by all other samples and doesn't have to show a full year of samples, but rather most recent info for the last day with potentially full resolution.
      // samples for the last 24 hours(day) can also be made to have full resolution -- downSampleDataForDateRange resolution can be customized pear each date unit, above -- by providing the resolution number that is the count of samples
      // data page can take care of showing a year's worth of sample data
      return {
        props: {
          ...pageProps,
          ...dsSamples,
          //samples: data.samples // non-sampled data
          //samples: dsSamples[DATE_UNITS.YEAR] // example of returning a set of samples for a specific date unit
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