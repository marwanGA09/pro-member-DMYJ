import { Link } from 'react-router';
import './DashBoardNavigation.scss';
function DashBoardNavigation() {
  return (
    <div className="dashboard-navigation">
      <Link to={'members'}>
        <h5>Members</h5>
      </Link>
      <Link to={'payments'}>
        <h5>Payments</h5>
      </Link>
      <Link to={'new-member'}>
        <h5>New Member</h5>
      </Link>
    </div>
  );
}

export default DashBoardNavigation;
