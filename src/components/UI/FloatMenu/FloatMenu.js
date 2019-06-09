import React, { memo } from "react";
import ClickedOutside from "../../../hoc/ClickedOutside/ClickedOutside";
import { Fade } from "react-reveal";
import classes from "./FloatMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FloatMenu(props) {
  return (
    <ClickedOutside onClickedOutside={props.deleteMe}>
      <Fade duration={250}>
        <ul className={classes.FloatDropdownMenu} style={props.customStyle}>
          {props.buttons.map((button, id) => (
            <li key={id}>
              <button
                onClick={() => {
                  props.deleteMe();
                  button.onClickFunction();
                }}
              >
                {button.icon ? <FontAwesomeIcon icon={button.icon} className="pr2" /> : null}
                {button.text}
              </button>
            </li>
          ))}
        </ul>
      </Fade>
    </ClickedOutside>
  );
}

export default memo(FloatMenu);
