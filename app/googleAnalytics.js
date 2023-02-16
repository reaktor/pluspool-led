import React from 'react';
import Script from 'next/script';
import { GA_TRACKING_ID } from '../helpers/constants';

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

export default GoogleAnalytics;
