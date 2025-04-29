import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext({
  darkTheme: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => setDarkTheme((prev) => !prev);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkTheme ? 'dark' : 'light'
    );
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
