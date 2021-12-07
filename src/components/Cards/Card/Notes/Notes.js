import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './Notes.module.css';

const Notes = props => {
  return (
    <AnimatePresence initial={false}>
      {props.notesArray.map(item => (
        <motion.div
          key={item.id}
          positionTransition
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <div
            className={`${classes.Note} bg-white br2 pl3 pr2 mb2 pv2 flex justify-between align-center`}
          >
            <p className="mv1 word-break-wrap">{item.text + item.id}</p>
            <button
              onClick={() => props.deleteNote(item.id)}
              className={`${classes.DeleteNote} close pointer o-0`}
              type="button"
            >
              <FontAwesomeIcon
                icon="times-circle"
                className="light-silver"
                style={{ width: '.8em' }}
              />
            </button>
          </div>
        </motion.div>
      ))}
     </AnimatePresence>
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
