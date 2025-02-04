import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { globalContext } from '../components/ContextProvider';
import axios from './../Utils/axios';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

const Navigation = () => {
  const { user, setUser } = useContext(globalContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    axios
      .get('logout', { withCredentials: true })
      .then((res) => {
        console.log(res);
        setUser(false);
      })
      .catch((e) => {
        console.log(e.response?.data);
      });
  };

  console.log('user navigation', user);
  console.log({ styles });
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_NAME },
  });
  console.log(':Kjsldf', user);

  return (
    <nav className={styles.navigation}>
      <Link to={'/'}>
        <div className={styles.logo}>MyLogo</div>
      </Link>

      {/* Hamburger Icon */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </div>

      {/* Menu Links */}
      <ul
        className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        <li className={styles.navItem}>
          <Link to={'/'}>Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link to={'/about'}>About</Link>
        </li>
        {user ? (
          <>
            {user.user.role === 'admin' && (
              <li className={styles.navItem}>
                <Link to={'/admin-dashboard'}>Admin</Link>
              </li>
            )}
            <li className={styles.navItem}>
              <Link to={'/Dashboard/members'}>Dashboard</Link>
            </li>
            <li className={styles.navItem}>
              <div className={styles.currentUser}>
                <AdvancedImage
                  cldImg={cld.image(user.user.profileUrl)}
                  className={styles.profileImage}
                />
                <div className={styles.userInfo}>
                  <span className={styles.username}>{user.user.username}</span>
                  <span className={styles.role}>{user.user.role}</span>
                </div>
              </div>
            </li>
            <li className={styles.navItem}>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={styles.navItem}>
              <Link to={'/login'}>Login</Link>
            </li>
            <li className={styles.navItem}>
              <Link to={'/signup'}>SignUp</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
