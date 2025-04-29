import { RouterProvider } from 'react-router-dom';

import mainRouter from './Layout/mainRouter';
import { ContextProvider } from './components/ContextProvider';
import './Style/index.css';

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={mainRouter} />
    </ContextProvider>
  );
}

export default App;
