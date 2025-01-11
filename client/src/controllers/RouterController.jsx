import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

function RouterController() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default RouterController;
