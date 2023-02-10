import Navbar from '../../components/Navbar';
import '../../styles/globals.css';

export default async function Layout({ children }) {
  return (
    <div id='AboutPage' className='container'>
      <Navbar />
      {children}
    </div>
  );
}
