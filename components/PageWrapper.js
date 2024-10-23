import { DATE_UNITS, ENDPOINTS } from "../helpers/constants";
import { downSampleDataForDateRange } from "../helpers/data";
import { removeInvalidSamples } from "../helpers/removeInvalidSamples";

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
    //page param can be used to dynamically change what happens during getStaticProps, as shown below

    const dataFetchParams = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
      // referrer: 'no-referrer'
    };

    try {
      const samplesUri = ENDPOINTS.samples;

      const response = await fetch(samplesUri, dataFetchParams);
      const data = removeInvalidSamples(await response.json());

      const latestSampleTimestamp =
        data.samples[data.samples.length - 1].noaaTime;

      // build out down sampled data for use in pages out of the Date Units object
      const dsSamples = Object.entries(DATE_UNITS).reduce(
        (prevPair, nextPair) => {
          // at start:
          // prevPair empty object
          // nextPair is the first key value pair out of DATE_UNITS obj
          // nextPair[1] = value of the current DATE_UNITS[key]
          return {
            ...prevPair,
            [nextPair[1]]: downSampleDataForDateRange(
              latestSampleTimestamp,
              nextPair[1],
              data.samples,
              nextPair[1] === DATE_UNITS.YEAR && page === 'index'
                ? 500
                : undefined
            ),
            // down sample the yearly data for the index page further; it doesn't show a graph and can have much
            // fewer data points to deal with while getting the point across and having better performance than before.
            // DownSampleDataForDateRange resolution can be customized pear each date unit, as seen above.
            // EX: providing a resolution number that is the count of samples will have full resolution
          };
        },
        {}
      );

      // omit unsampled data and use down sampled data, instead
      const { samples, ...pageProps } = data;

      // index page has further down sampled yearly data, so it's not burdened by all other date unit samples or more detailed yearly data it doesn't need.
      // data page can take care of showing a more detailed breakdown of the sampled data across date ranges.
      return {
        props: {
          ...pageProps,
          ...(page === 'index'
            ? { samples: dsSamples[DATE_UNITS.YEAR] }
            : { ...dsSamples }),
          //samples: data.samples // EX: non-sampled data
        },
        revalidate: 60 * 15, // revalidate every 15 minutes <- provides Incremental Static Regeneration
      };
    } catch (err) {
      console.log(err);
      throw new Error(`Request rejected with status ${err.status}`);
    }
  };
};

export default PageWrapper;
