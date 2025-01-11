import { Outlet } from 'react-router-dom';
import DashBoardNavigation from '../components/DashBoardNavigation';
import './DashBoardRouterController.scss';
function DashBoardRouterController() {
  return (
    <div className="dashboard-router">
      <div className="dashboard-router__right">
        <DashBoardNavigation />
      </div>
      <div className="dashboard-router__left">
        <Outlet />
      </div>
    </div>
  );
}

export default DashBoardRouterController;
