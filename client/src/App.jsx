import { RouterProvider } from 'react-router';

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
