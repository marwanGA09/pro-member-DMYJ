import { Outlet, RouterProvider } from 'react-router';

import router from './Layout/mainRouter';
import './App.scss';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
