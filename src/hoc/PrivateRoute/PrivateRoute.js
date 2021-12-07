import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import Auth from '../../auth';

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  return Auth.isUserAuthenticated() ? (
        children
      ) : (
        <Navigate
          replace
          to={{
            pathname: '/login',
            state: { from: location.pathname }
          }}
        />
      )
        };

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export default PrivateRoute;
