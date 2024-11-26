import { createContext, useState } from 'react';

const myContext = createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState(false);
  return (
    <myContext.Provider value={{ user, setUser }}>
      {children}
    </myContext.Provider>
  );
}

export { ContextProvider, myContext };
