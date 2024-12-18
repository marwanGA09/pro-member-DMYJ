import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { myContext } from './ContextProvider';

function ProtectedRoute() {
  // FIX
  const { user } = useContext(myContext);
  let some = true;
  return some ? <Outlet /> : <Navigate to={'/login'} />;
}

export default ProtectedRoute;
