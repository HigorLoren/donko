import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fade } from "react-reveal";
import TransitionGroup from "react-transition-group/TransitionGroup";
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
              onClick={() => props.deleteNote(item.id)}
              className={`${classes.DeleteNote} close pointer o-0`}
              type="button"
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

Notes.propTypes = {
  notesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteNote: PropTypes.func
};

Notes.defaultProps = {
  deleteNote: () => null
};

export default Notes;
