import Navbar from '../../components/Navbar';
import '../../styles/globals.css';

export default async function Layout({ children }) {
  return (
    <div id='IndexPage' data-template='IndexPage' className='container'>
      <Navbar />
      {children}
    </div>
  );
}
