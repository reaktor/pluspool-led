import Navbar from '../../components/Navbar';
import '../../styles/globals.css';

export default async function Layout({ children }) {
  return (
    <div className='container' data-template='AboutPage'>
      <Navbar />
      {children}
    </div>
  );
}
