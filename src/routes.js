import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Workbench from './containers/Workbench/Workbench';
import Settings from './containers/Settings/Settings';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';

import PrivateRoute from './hoc/PrivateRoute/PrivateRoute';

const AppRoutes = () => (
  <Routes>
    <Route exact path="/register" element={<Register />} />
    <Route exact path="/login" element={<Login />} />
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
