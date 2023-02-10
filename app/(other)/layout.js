import { GA_TRACKING_ID } from '../../helpers/constants';
import Script from 'next/script';

import DataContextProvider from '../../providers/DataProvider';
import { getData } from '../../helpers/dataLoader';

import '../../styles/globals.css';
import Navbar from '../../components/Navbar';

const GoogleAnalytics = () => (
  <>
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=UA-17668746-5"
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}');
    `}
    </Script>
  </>
);

export default async function RootLayout ({ children }) {
  let data = await getData();
  return (
    <html>
    <GoogleAnalytics/>
    <head/>
    <body>
    <div className='container'>
        <Navbar />
      <DataContextProvider data={data}>{children}</DataContextProvider>
    </div>
    </body>
    </html>
  );
}
