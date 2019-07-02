import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
import Login from "./containers/Login/SignIn";

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

const App = () => {
  const handleGetUser = token => {
    // BACKENDPLACEHOLDER:
    return {
      name: "Higor Lorenzon",
      image: "https://api.adorable.io/avatars/40/abott@adorable.png"
    };
    // --END--
  };

  return (
    <Switch>
      <Route path="/settings" component={Settings} />
      <Route path="/Login" component={Login} />
      <Route
        path="/"
        exact
        render={() => {
          const token = localStorage.getItem("token");
          return token ? <Workbench user={handleGetUser(token)} /> : <Redirect to="/login" />;
        }}
      />
    </Switch>
  );
};

export default App;
