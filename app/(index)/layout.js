import Navbar from '../../components/Navbar';
import '../../styles/globals.css';

/**
 * Child layout that wraps the index page -- main page -- with specific styles
 */
export default async function Layout({ children }) {
  return (
    <div className='container' data-template="IndexPage">
      <Navbar />
      {children}
    </div>
  );
}
