import { RouterProvider } from 'react-router';

import mainRouter from './Layout/mainRouter';
import './App.scss';
import { ContextProvider } from './components/ContextProvider';

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={mainRouter} />
    </ContextProvider>
  );
}

export default App;
