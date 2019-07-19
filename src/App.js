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

import Routes from './routes';

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

const App = () => <Routes />;

export default App;
