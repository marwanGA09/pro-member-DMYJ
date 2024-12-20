import { useContext } from 'react';
import { globalContext } from './ContextProvider';
import { Navigate, Outlet } from 'react-router';

function AuthorizedRoute() {
  const { user } = useContext(globalContext);
  console.log(user);
  if (user && user.role === 'admin') {
    return <Outlet />;
  }
  return <Navigate to={'/'} />;
}

export default AuthorizedRoute;
