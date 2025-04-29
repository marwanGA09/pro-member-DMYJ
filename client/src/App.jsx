import { ThemeProvider } from './components/ThemeProvider';
import { RouterProvider } from 'react-router-dom';

import mainRouter from './Layout/mainRouter';
import { ContextProvider } from './components/ContextProvider';
import './Style/index.scss';

function App() {
  return (
    <ThemeProvider>
      <ContextProvider>
        <RouterProvider router={mainRouter} />
      </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
