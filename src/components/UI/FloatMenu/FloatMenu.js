import React, { memo, useEffect } from "react";
import { Fade } from "react-reveal";
import classes from "./FloatMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FloatMenu(props) {
  document.addEventListener("click", props.deleteMe);

  useEffect(() => {
    return () => {
      document.removeEventListener("click", props.deleteMe);
    };
  }, [props.deleteMe]);

  return (
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
  );
}

export default memo(FloatMenu);
