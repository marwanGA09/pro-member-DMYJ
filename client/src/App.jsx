import { BrowserRouter, RouterProvider } from 'react-router-dom';

import mainRouter from './Layout/mainRouter';
import { ContextProvider } from './components/ContextProvider';
import './App.scss';

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={mainRouter} />
    </ContextProvider>
  );
}

export default App;
