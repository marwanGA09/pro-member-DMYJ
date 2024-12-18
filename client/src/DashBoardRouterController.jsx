import { Outlet } from 'react-router';
import DashBoardNavigation from './components/DashBoardNavigation';

function DashBoardRouterController() {
  return (
    <div>
      <DashBoardNavigation />
      <Outlet />
    </div>
  );
}

export default DashBoardRouterController;
