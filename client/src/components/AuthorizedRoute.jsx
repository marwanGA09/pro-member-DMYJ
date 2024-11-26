import { useContext } from 'react';
import { myContext } from './ContextProvider';
import { Navigate, Outlet } from 'react-router';

function AuthorizedRoute() {
  const { user } = useContext(myContext);
  console.log(user);
  if (user && user.role === 'admin') {
    return <Outlet />;
  }
  return <Navigate to={'/'} />;
}

export default AuthorizedRoute;
