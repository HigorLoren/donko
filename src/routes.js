import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Workbench from './containers/Workbench/Workbench';
import Settings from './containers/Settings/Settings';
import Login from './containers/Login/Login';

import PrivateRoute from './hoc/PrivateRoute/PrivateRoute';

const Routes = () => (
  <Switch>
    <Route exact path="/Login" component={Login} />
    <PrivateRoute path="/settings" component={Settings} />
    <PrivateRoute exact path="/" component={Workbench} />
  </Switch>
);

export default Routes;
