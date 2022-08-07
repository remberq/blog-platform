import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hook/hooks';

const PrivateRoute = ({ children }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to={'/sign-in'} />;
  }
  return children;
};

export default PrivateRoute;
