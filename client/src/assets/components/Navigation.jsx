import { useState } from 'react';
import './Navigation.scss';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
      <div className="logo" onClick={() => (window.location.href = '/')}>
        MyLogo
      </div>
      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <a href="/dashboard">Dashboard</a>
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
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/signup">Signup</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
