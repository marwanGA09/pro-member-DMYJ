import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { globalContext } from './ContextProvider';

function ProtectedRoute() {
  // FIX
  const { user } = useContext(globalContext);
  return user ? <Outlet /> : <Navigate to={'/login'} />;
}

export default ProtectedRoute;
