import { NavLink } from 'react-router-dom'; // Use NavLink for active styles
import styles from './DashBoardNavigation.module.scss';

function DashBoardNavigation() {
  return (
    <div className={styles['dashboard-navigation']}>
      <NavLink
        style={({ isActive }) => {
          return isActive ? { color: ' #4caf50', fontWeight: 'bold' } : {};
        }}
        to="members"
      >
        <h5>Members</h5>
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return isActive ? { color: ' #4caf50', fontWeight: 'bold' } : {};
        }}
        to="payments"
      >
        <h5>Payments</h5>
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return isActive ? { color: ' #4caf50', fontWeight: 'bold' } : {};
        }}
        to="new-member"
      >
        <h5>New Member</h5>
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return isActive ? { color: ' #4caf50', fontWeight: 'bold' } : {};
        }}
        to="general"
      >
        <h5>General</h5>
      </NavLink>
    </div>
  );
}

export default DashBoardNavigation;
