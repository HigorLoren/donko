import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './hoc/PrivateRoute/PrivateRoute';
import Auth from './auth';

import Workbench from './containers/Workbench/Workbench';
import Settings from './containers/Settings/Settings';
import Login from './containers/Login/Login';

const Routes = () => (
  <Switch>
    <Route path="/Login" render={() => (Auth.getToken() ? <Redirect to="/" /> : <Login />)} />
    <PrivateRoute path="/settings" component={Settings} />
    <PrivateRoute exact path="/" render={() => <Workbench />} />
  </Switch>
);

export default Routes;
