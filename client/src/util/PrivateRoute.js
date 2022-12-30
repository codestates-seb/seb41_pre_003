// import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import isLogin from '../util/isLogin';

const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Element {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default PrivateRoute;
