import { createContext, useState } from 'react';

const globalContext = createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState(false);
  console.log('user', user);
  return (
    <globalContext.Provider value={{ user, setUser }}>
      {children}
    </globalContext.Provider>
  );
}

export { ContextProvider, globalContext };
