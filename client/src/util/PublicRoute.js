// import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import isLogin from '../util/isLogin';

const PublicRoute = ({ element: Element, restricted, path, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Navigate to={path} />
        ) : (
          <Element {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
