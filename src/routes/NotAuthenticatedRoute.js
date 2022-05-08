import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import Auth from '../auth';

const NotAuthenticatedRoute = ({ children }) => {
  const location = useLocation();

  return !Auth.userAuthenticated() ? (
    children
  ) : (
    <Navigate
      replace
      to={{
        pathname: '/',
        state: { from: location.pathname }
      }}
    />
  );
};

NotAuthenticatedRoute.propTypes = {
  children: PropTypes.element
};

export default NotAuthenticatedRoute;
