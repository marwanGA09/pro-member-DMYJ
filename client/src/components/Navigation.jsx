import { useContext, useState } from 'react';
import { Link } from 'react-router'; // Changed to use `react-router-dom` for Link
import './Navigation.scss';
import { myContext } from '../components/ContextProvider';
import axios from 'axios';

const Navigation = () => {
  const { user, setUser } = useContext(myContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling menu

  const handleLogout = () => {
    axios
      .get('http://localhost:4321/v1/logout', {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        console.log(res);
        setUser(false);
      })
      .catch((e) => {
        console.log(e.response?.data);
      });
    // alert('You have been logged out.');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
    <nav className="navigation">
      <Link to={'/'}>
        <div className="logo">MyLogo</div>
      </Link>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      {/* Menu Links */}
      <ul
        className={`nav-links ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/about'}>About</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to={'/admin-dashboard'}>Admin</Link>
            </li>
            <li>
              <Link to={'/Dashboard'}>Dashboard</Link>
            </li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={'/login'}>Login</Link>
            </li>
            <li>
              <Link to={'/signup'}>SignUp</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
