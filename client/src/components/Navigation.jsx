import { useContext, useState } from 'react';
import { Link } from 'react-router';
import './Navigation.scss';
import { myContext } from '../components/ContextProvider';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const { user } = useContext(myContext);
  console.log(user);
  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('You have been logged out.');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    alert('You are now logged in.');
  };

  return (
    <nav className="navigation">
      <Link to={'/'}>
        <div className="logo">MyLogo</div>
      </Link>
      <ul className="nav-links">
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/about'}>About</Link>
        </li>
        {isLoggedIn ? (
          <>
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
