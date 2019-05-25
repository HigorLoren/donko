import React, { useState } from "react";
import boardIcon from "../../assets/board.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SidebarMenu.css";
import FloatMenu from "../UI/FloatMenu/FloatMenu";

const SidebarMenu = props => {
  const [showFloatMenu, changeShowFloatMenu] = useState(false);

  return (
    <div className="sidebarMenu ph0 fl w3-5 flex flex-wrap flex-column">
      {props.boards.map(board => {
        return (
          <div
            key={board.id}
            onClick={() => props.boardClicked(board)}
            className={`tc boardOption w-100${
              props.boardSelected === board.id ? " boardOptionSelected pointer" : ""
            }`}
          >
            <img src={boardIcon} alt="board Icon" className="boardIcon" />
            <p className="mb0 mt1 f7 fw7 mid-gray">{board.name}</p>
          </div>
        );
      })}
      <div className="tc settingsMenuOption w-100 relative" style={{ marginTop: "auto" }}>
        <button className="pointer" onClick={() => changeShowFloatMenu(prevState => !prevState)}>
          <FontAwesomeIcon icon="cog" className="settingsIcon silver" />
        </button>
        {showFloatMenu ? (
          <FloatMenu
            customStyle={{ left: "40%", right: "auto", top: "auto", bottom: "80%" }}
            buttons={[
              {
                onClickFunction: () => null,
                icon: "",
                text: "Settings"
              },
              {
                onClickFunction: () => null,
                icon: "",
                text: "Item 2"
              }
            ]}
            deleteMe={() => changeShowFloatMenu(false)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarMenu;
