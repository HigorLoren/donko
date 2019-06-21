import React, { memo } from "react";
import PropTypes from "prop-types";
import { Fade } from "react-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClickedOutside from "../../../hoc/ClickedOutside/ClickedOutside";
import classes from "./FloatMenu.module.css";

function FloatMenu(props) {
  return (
    <ClickedOutside onClickedOutside={props.deleteMe}>
      <Fade duration={250}>
        <ul className={classes.FloatDropdownMenu} style={props.customStyle}>
          {props.buttons.map((button, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  props.deleteMe();
                  button.onClickFunction();
                }}
                type="button"
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

FloatMenu.propTypes = {
  deleteMe: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  customStyle: PropTypes.objectOf(PropTypes.string)
};

FloatMenu.defaultProps = {
  customStyle: {}
};

export default memo(FloatMenu);
