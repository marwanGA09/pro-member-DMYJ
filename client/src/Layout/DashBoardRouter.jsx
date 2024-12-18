import { createBrowserRouter, RouterProvider } from 'react-router';
import DashBoardRouterController from '../DashBoardRouterController';
import GeneralDashBoard from '../pages/GeneralDashBoard';
import Members from '../pages/Members';
import Payments from '../pages/Payments';

const dashboardRouter = createBrowserRouter([
  {
    path: '/',
    element: <DashBoardRouterController />,
    children: [
      { index: true, element: <GeneralDashBoard /> },
      { path: 'members', element: <Members /> },
      { path: 'payments', element: <Payments /> },
    ],
  },
]);

export default dashboardRouter;
