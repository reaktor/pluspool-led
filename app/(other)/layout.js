import { getData } from '../../helpers/dataLoader';
import DataContextProvider from '../../providers/DataProvider';
import Navbar from '../../components/Navbar';
import GoogleAnalytics from '../googleAnalytics';
import '../../styles/globals.css';

//Root Layout for other pages that are not index, and have a different container style
export default async function RootLayout ({ children }) {
  let data = await getData();
  return (
    <html>
    <head>
      <GoogleAnalytics/>
    </head>
    <body>
    <div className='container'>
        <Navbar />
      <DataContextProvider data={data}>{children}</DataContextProvider>
    </div>
    </body>
    </html>
  );
}
