import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import LoginPage from '../pages/Login';
import SignUp from '../pages/SignUp';
import About from '../pages/About';
import RouterController from '../RouterController';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminDashboard from '../pages/AdminDashboard';
import AuthorizedRoute from '../components/AuthorizedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouterController />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
          },
        ],
      },
      {
        element: <AuthorizedRoute />,
        children: [
          {
            path: 'admin-dashboard',
            element: <AdminDashboard />,
          },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },

  {
    path: '*',
    element: <h1>404 Not Found</h1>,
  },
]);

export default router;
