import { getData } from '/helpers/dataLoader';
import DataContextProvider from '../providers/DataProvider';
import GoogleAnalytics from './googleAnalytics';
import '../styles/globals.css';

/**
 * Root Layout that gets data and wraps the app with the Context Provider
 */
export default async function RootLayout ({ children }) {
  let data = await getData();
  return (
    <html>
    <head>
      <GoogleAnalytics/>
    </head>
    <body>
    <DataContextProvider data={data}>
      {children}
    </DataContextProvider>
    </body>
    </html>
  );
}
