import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClickedOutside from '../../../hoc/ClickedOutside';
import classes from './FloatMenu.module.css';

function FloatMenu(props) {
  return (
    <ClickedOutside onClickedOutside={props.deleteMe}>
      <AnimatePresence>
        <motion.ul
          initial={{ opacity: 0, x: 3, height: 0 }}
          animate={{ opacity: 1, x: 0, height: 'auto', transition: { duration: 0.15 } }}
          exit={{ opacity: 0, x: 3, height: 0 }}
          ul
          className={classes.FloatDropdownMenu}
          style={props.customStyle}
        >
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
        </motion.ul>
      </AnimatePresence>
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
