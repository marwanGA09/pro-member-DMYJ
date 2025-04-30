// src/components/ThemeToggle.jsx
import { FaMoon, FaSun } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import styles from './ToggleTheme.module.scss';
console.log({ styles });
const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', storedTheme);
    setTheme(storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className={styles.themeToggle}>
      {theme === 'light' ? (
        <FaMoon fill="black" />
      ) : (
        <FaSun fill="rgb(255, 187, 0)" />
      )}
    </button>
  );
};

export default ThemeToggle;
