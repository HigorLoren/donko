import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TransitionGroup from "react-transition-group/TransitionGroup";
import { Fade } from "react-reveal";
import classes from "./Notes.module.css";

const Notes = props => {
  return (
    <TransitionGroup appear enter exit>
      {props.notesArray.map(item => (
        <Fade key={item.id} collapse appear bottom duration={250}>
          <div
            className={`${
              classes.Note
            } bg-white br2 pl3 pr2 mb2 pv2 flex justify-between align-center`}
          >
            <p className="mv1 word-break">{item.text}</p>
            <button
              data-id={item.id}
              onClick={props.deleteNote}
              type="button"
              className={`${classes.DeleteNote} close pointer o-0`}
              aria-label="Close"
            >
              <FontAwesomeIcon
                icon="times-circle"
                className="light-silver"
                style={{ width: ".8em" }}
              />
            </button>
          </div>
        </Fade>
      ))}
    </TransitionGroup>
  );
};

export default Notes;
