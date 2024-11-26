import { RouterProvider } from 'react-router';

import router from './Layout/mainRouter';
import './App.scss';
import { ContextProvider } from './components/ContextProvider';

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
