import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fade } from "react-reveal";
import "./Modal.css";

const Modal = props => {
  const [showModal, setShowModal] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setShowModal(true);
    setLoaded(true);
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  if (!showModal && loaded) {
    props.callbackCloseModal();
  }

  return (
    <Fade duration={300} when={showModal}>
      <div
        className="modal fixed top-0 left-0 w-100 h-100 overflow-hidden outline-0"
        tabIndex="-1"
        role="dialog"
      >
        <div
          className="black-offset top-0 right-0 left-0 bottom-0"
          onClick={() => setShowModal(false)}
        />
        <div className="modal-dialog flex w-auto relative items-center" role="document">
          <div className="modal-content pv3 br2 shadow-5 relative flex flex-column w-100 bg-white">
            <div className="ph3 flex justify-between">
              <h4 className="mt0 mb2 f4 mid-gray">{props.title}</h4>
              <button
                type="button"
                className="close mid-gray pointer dim"
                onClick={() => setShowModal(false)}
              >
                <FontAwesomeIcon icon="times" className="" />
              </button>
            </div>
            <div className="pa3">{props.children}</div>
            {props.footer ? <div className="flex ph3 justify-end">{props.footer}</div> : ""}
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Modal;
