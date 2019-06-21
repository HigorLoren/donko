import React from "react";
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
    <Workbench
      user={{
        name: "Higor Lorenzon",
        image: "https://api.adorable.io/avatars/40/abott@adorable.png"
      }}
    />
  );
}

export default App;
