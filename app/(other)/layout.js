import Navbar from '../../components/Navbar';
import '../../styles/globals.css';

/**
 * Child layout that wraps all pages that are not index
 * and has no index specific container styles
 */
export default async function Layout({ children }) {
  return (
    <div className='container'>
      <Navbar />
      {children}
    </div>
  );
}

