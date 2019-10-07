import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Workbench from './containers/Workbench/Workbench';
import Settings from './containers/Settings/Settings';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';

import PrivateRoute from './hoc/PrivateRoute/PrivateRoute';

const Routes = () => (
  <Switch>
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute exact path="/settings" component={Settings} />
    <PrivateRoute exact path="/" component={Workbench} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
