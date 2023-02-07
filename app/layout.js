import { GA_TRACKING_ID } from '../helpers/constants';
import Script from 'next/script';
import Navbar from './Navbar';
import '../styles/globals.css';

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

export default function RootLayout({ children }) {
  return (
    <html>
      <GoogleAnalytics />
      <head />
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
