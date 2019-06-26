import React from "react";
import { Route, Switch } from "react-router-dom";
import "tachyons";

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
} from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

import Workbench from "./containers/Workbench/Workbench";
import Settings from "./containers/Settings/Settings";

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

function App() {
  return (
    <Switch>
      <Route path="/settings" render={() => <Settings />} />
      <Route
        path="/"
        render={() => (
          <Workbench
            user={{
              name: "Higor Lorenzon",
              image: "https://api.adorable.io/avatars/40/abott@adorable.png"
            }}
          />
        )}
      />
    </Switch>
  );
}

export default App;
