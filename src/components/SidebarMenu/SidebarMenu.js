import React, { useState } from "react";
import boardIcon from "../../assets/board.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./SidebarMenu.module.css";
import FloatMenu from "../UI/FloatMenu/FloatMenu";

const SidebarMenu = props => {
  const [showFloatMenu, changeShowFloatMenu] = useState(false);

  return (
    <div className={`${classes.SidebarMenu} ph0 fl w3-5 flex flex-wrap flex-column`}>
      {props.boards.map(board => {
        return (
          <button
            key={board.id}
            onClick={() => props.boardClicked(board)}
            className={`${classes.BoardOption} tc w-100${
              props.boardSelected === board.id ? ` ${classes.BoardOptionSelected} pointer` : ""
            }`}
          >
            <img src={boardIcon} alt="board Icon" className={classes.BoardIcon} />
            <p className="mb0 mt1 f7 fw7 mid-gray">{board.name}</p>
          </button>
        );
      })}
      <div className={`${classes.AddBoardOption} tc w-100 relative`}>
        <button className="pointer" onClick={props.newBoard}>
          <FontAwesomeIcon icon="plus-circle" className={`${classes.AddBoardIcon} moon-gray`} />
        </button>
      </div>
      <div
        className={`${classes.SettingsMenuOption} tc w-100 relative`}
        style={{ marginTop: "auto" }}
      >
        <button className="pointer" onClick={() => changeShowFloatMenu(prevState => !prevState)}>
          <FontAwesomeIcon icon="cog" className={`${classes.SettingsIcon} silver`} />
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
