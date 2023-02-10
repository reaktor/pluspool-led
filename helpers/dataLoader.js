import { ENDPOINTS } from './constants';

export const getData = async () => {
  const res = await fetch(ENDPOINTS.samples, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
    },
  });

  return res.json();
};

// // import fetch from 'isomorphic-unfetch'

// // six seconds
// const updateTime = 6 * 60 * 1000

// const dataFetchParams = {
//   method: 'GET',
//   mode: 'cors',
//   cache: 'no-cache',
//   credentials: 'same-origin',
//   headers: { 'Content-Type': 'application/json', 'Accept-Encoding': 'gzip' },
//   // referrer: 'no-referrer'
// };

// export const fetchSamplesData = () =>
//   fetch(ENDPOINTS.samples, dataFetchParams)
//     .then((response) => {
//       if (response.ok) return response.json();
//       throw new Error(`Request rejected with status ${response.status}`);
//     })
//     .then((json) => {
//       if (!json.version) return { samples: json };
//       return json;
//     });

// export const dataFetchProcess = (() => {
//   let dataFetchProcess = null

//   const fetching = update => () => {
//     console.log('Fetching new data ...')
//     fetchSamplesData().then(data => {
//       console.log('New data received. Loading ...')
//       console.log(data);
//       update(data)
//     })
//   }

//   const start = update => {
//     if (dataFetchProcess === null) {
//       console.log('Begining data fetching.')
//       const fetcher = fetching(update)
//       fetcher() // first instance
//       dataFetchProcess = setInterval(fetcher, updateTime)
//     } else {
//       console.log('Data fetching already running.')
//     }
//   }

//   const stop = () => { clearInterval(dataFetchProcess) }

//   return { start, stop }
// })()
