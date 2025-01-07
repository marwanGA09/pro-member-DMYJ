import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import LoginPage from '../pages/Login';
import SignUp from '../pages/SignUp';
import About from '../pages/About';
import RouterController from '../controllers/RouterController';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminDashboard from '../pages/DashBoard/AdminDashboard';
import AuthorizedRoute from '../components/AuthorizedRoute';
import GeneralDashBoard from '../pages/DashBoard/GeneralDashBoard';
import Members from '../pages/DashBoard/Members';
import Payments from '../pages/DashBoard/Payments';
import DashBoardRouterController from '../controllers/DashBoardRouterController';
import NewMember from '../pages/DashBoard/NewMember';
import Member from '../pages/DashBoard/Member';
import PaymentForm from '../pages/DashBoard/PaymentForm';

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
              { path: 'members/:memberId', element: <Member /> },
              {
                path: 'members/:memberId/new-payment',
                element: <PaymentForm />,
              },
              { path: 'payments', element: <Payments /> },
              { path: 'new-member', element: <NewMember /> },
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
