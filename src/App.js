import React from 'react';
import 'tachyons';

import Auth from './auth';
import AppRoutes from './routes';
import './fontAwesome';

if (Auth.userHasToken() && !Auth.isUserAuthenticated()) {
  Auth.authenticateUser(Auth.getLocalToken());
}

const App = () => <AppRoutes />;

export default App;
