import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { myContext } from './ContextProvider';

function ProtectedRoute() {
  // FIX
  const { user } = useContext(myContext);
  return user ? <Outlet /> : <Navigate to={'/login'} />;
}

export default ProtectedRoute;
