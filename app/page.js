import Home from './Home';
// import { ENDPOINTS } from '../helpers/constants';

// async function getData() {
//   const res = await fetch(
//     'https://pluspool-east-river-data.s3.us-east-2.amazonaws.com/2020-04-30T00%3A00%3A46.330Z.json',
//     {
//       method: 'GET',
//       mode: 'cors',
//       cache: 'no-cache',
//       credentials: 'same-origin',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept-Encoding': 'gzip',
//       },
//     }
//   );

//   return res.json();
// }

const Page = async () => {
  // const { sources, samples, units } = await getData();

  return <Home />;
};

export default Page;
