import { ENDPOINTS } from './constants';

export const getData = async () => {
  const res = await fetch(ENDPOINTS.samples, {
    method: 'GET',
    mode: 'cors',
    // cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
    },
  });

  return res.json();
};
