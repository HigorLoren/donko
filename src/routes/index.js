import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Workbench from '../containers/Workbench/Workbench';
import Settings from '../containers/Settings/Settings';
import Login from '../containers/Login/Login';
import Register from '../containers/Register/Register';

import PrivateRoute from './PrivateRoute';
import NotAuthenticatedRoute from './NotAuthenticatedRoute';

const AppRoutes = () => (
  <Routes>
    <Route
      exact
      path="/register"
      element={
        <NotAuthenticatedRoute>
          <Register />
        </NotAuthenticatedRoute>
      }
    />
    <Route
      exact
      path="/login"
      element={
        <NotAuthenticatedRoute>
          <Login />
        </NotAuthenticatedRoute>
      }
    />
    <Route
      exact
      path="/settings"
      element={
        <PrivateRoute>
          <Settings />
        </PrivateRoute>
      }
    />
    <Route
      exact
      path="/"
      element={
        <PrivateRoute>
          <Workbench />
        </PrivateRoute>
      }
    />
    <Route path="*" render={() => <Navigate replace to="/" />} />
  </Routes>
);

export default AppRoutes;
