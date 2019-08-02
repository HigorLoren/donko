import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './auth';

import Workbench from './containers/Workbench/Workbench';
import Settings from './containers/Settings/Settings';
import Login from './containers/Login/Login';

// import PrivateRoute from './hoc/PrivateRoute/PrivateRoute';

const Routes = () => (
  <Switch>
    <Route path="/Login" render={() => (Auth.getToken() ? <Redirect to="/" /> : <Login />)} />
    <Route path="/settings" component={Settings} />
    <Route exact path="/" render={() => <Workbench />} />
  </Switch>
);

export default Routes;
