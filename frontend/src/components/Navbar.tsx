import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-800 text-white px-4 py-3 flex gap-4">
    <Link to="/" className="hover:underline">Upload Detection</Link>
    <Link to="/live" className="hover:underline">Live Detection</Link>
  </nav>
);

export default Navbar;
