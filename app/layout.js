import { GA_TRACKING_ID } from '../helpers/constants';
import Script from 'next/script';
import Navbar from './Navbar';
import DataContextProvider from '../providers/DataProvider';

import '../styles/globals.css';

async function getData() {
  const res = await fetch(
    'https://pluspool-east-river-data.s3.us-east-2.amazonaws.com/2020-04-30T00%3A00%3A46.330Z.json',
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
    }
  );

  return res.json();
}

const GoogleAnalytics = () => (
  <>
    <Script
      async
      src='https://www.googletagmanager.com/gtag/js?id=UA-17668746-5'
      strategy='afterInteractive'
    />
    <Script id='google-analytics' strategy='afterInteractive'>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}');
    `}
    </Script>
  </>
);

export default async function RootLayout({ children }) {
  const data = await getData();

  return (
    <html>
      <GoogleAnalytics />
      <head />
      <body>
        <div className='container'>
          <Navbar />
          <DataContextProvider data={data}>{children}</DataContextProvider>
        </div>
      </body>
    </html>
  );
}
