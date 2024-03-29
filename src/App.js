import React from 'react';
import 'tachyons';

import {
  faCog,
  faEllipsisV,
  faPalette,
  faPenSquare,
  faPlus,
  faPlusCircle,
  faSignOutAlt,
  faTimes,
  faTimesCircle,
  faTrashAlt,
  faUserCog
} from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';

import Auth from './auth';
import AppRoutes from './routes';

library.add(
  faEllipsisV,
  faPlus,
  faPlusCircle,
  faTimesCircle,
  faPalette,
  faPenSquare,
  faTrashAlt,
  faTimes,
  faUserCog,
  faSignOutAlt,
  faCog
);

if (Auth.userHasToken() && !Auth.isUserAuthenticated()) {
  Auth.authenticateUser(Auth.getLocalToken());
}

const App = () => <AppRoutes />;

export default App;
