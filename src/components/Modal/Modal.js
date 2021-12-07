import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './Modal.module.css';

const Modal = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') handleCloseModal();
    });
  };

  const handleCloseModal = () => {
    props.callbackCloseModal();
  };

  useEffect(() => {
    document.body.classList.add('modal-open');
    handleShowModal();
    return () => {
      document.body.classList.remove('modal-open');
    };
  });

  return createPortal(
    <AnimatePresence>
      <div
        className={`${classes.Modal} fixed top-0 left-0 w-100 h-100 overflow-hidden outline-0"`}
        tabIndex="-1"
        role="dialog"
      >
        <div
          className={`${classes.BlackOffset} top-0 right-0 left-0 bottom-0`}
          onClick={handleCloseModal}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className={`${classes.ModalDialog} flex w-auto relative items-center`}
          role="document"
        >
          <div
            className={`${classes.ModalContent} pv3 br2 shadow-5 relative flex flex-column w-100 bg-white`}
          >
            <div className="ph3 flex justify-between">
              <h4 className="mt0 mb2 f4 mid-gray">{props.title}</h4>
              <button
                type="button"
                className="close mid-gray pointer dim"
                onClick={handleCloseModal}
              >
                <FontAwesomeIcon icon="times" className="" />
              </button>
            </div>
            <div className="pa3">{props.children}</div>
            {props.footer ? <div className="flex ph3 justify-end">{props.footer}</div> : ''}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

Modal.propTypes = {
  callbackCloseModal: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
};

Modal.defaultProps = {
  callbackCloseModal: () => null,
  title: '',
  children: null,
  footer: null,
};

export default Modal;
