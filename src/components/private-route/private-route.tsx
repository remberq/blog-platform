import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ children }) => {
  const [cookies] = useCookies(['token']);
  if (!cookies.token) {
    return <Navigate to={'/sign-in'} />;
  }
  return children;
};

export default PrivateRoute;
