import { NavLink } from 'react-router-dom'; // Use NavLink for active styles
import styles from './DashBoardNavigation.module.scss';

function DashBoardNavigation() {
  return (
    <div className={styles['dashboard-navigation']}>
      <NavLink to="members">
        <h5>Members</h5>
      </NavLink>
      <NavLink to="payments">
        <h5>Payments</h5>
      </NavLink>
      <NavLink to="new-member">
        <h5>New Member</h5>
      </NavLink>
      <NavLink to="general">
        <h5>General</h5>
      </NavLink>
    </div>
  );
}

export default DashBoardNavigation;
