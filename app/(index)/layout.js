import { getData } from '../../helpers/dataLoader';
import DataContextProvider from '../../providers/DataProvider';
import Navbar from '../../components/Navbar';
import GoogleAnalytics from '../googleAnalytics';
import '../../styles/globals.css';

//Root layout for the index page
export default async function RootLayout({ children }) {
  let data = await getData();
  return (
    <html>
    <head>
      <GoogleAnalytics/>
    </head>
    <body>
    <div className="container" data-template="IndexPage">
      <Navbar/>
      <DataContextProvider data={data}>{children}</DataContextProvider>
    </div>
    </body>
    </html>
  );
}
