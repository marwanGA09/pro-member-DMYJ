import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import LoginPage from '../pages/Login';
import SignUp from '../pages/SignUp';
import About from '../pages/About';
import RouterController from '../RouterController';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminDashboard from '../pages/AdminDashboard';
import AuthorizedRoute from '../components/AuthorizedRoute';
import GeneralDashBoard from '../pages/GeneralDashBoard';
import Members from '../pages/Members';
import Payments from '../pages/Payments';
import DashBoardRouterController from '../DashBoardRouterController';

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
            path: 'dashboard',
            element: <DashBoardRouterController />,
            children: [
              { index: true, element: <GeneralDashBoard /> },
              { path: 'members', element: <Members /> },
              { path: 'payments', element: <Payments /> },
            ],
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
