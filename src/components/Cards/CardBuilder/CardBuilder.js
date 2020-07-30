import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './CardBuilder.module.css';

const newCardDashColor = '#636363';

const CardBuilder = (props) => {
  const [textInputNameCard, setTextInputNameCard] = useState('New Name');
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (!initial) {
      props.scrollToNewCard();
    }
  }, [props, initial]);

  const handleLeaveInputNameCard = () => {
    setTextInputNameCard('New Name');
    setInitial(true);
    props.newCard({ name: textInputNameCard, dashColor: newCardDashColor });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLeaveInputNameCard();
    }
  };

  return initial ? (
    <div className={classes.CardBuilder}>
      <div
        onClick={() => setInitial(false)}
        className="mh3 br3 w-100 pa3 black-05 bg-black-03 flex justify-center items-center dim pointer"
      >
        <FontAwesomeIcon icon="plus-circle" size="2x" />
      </div>
    </div>
  ) : (
    <div id="newCard">
      <div className={`mh3 pb2 br3 shadow-6 relative ${classes.NewCard}`}>
        <div
          style={{
            background: newCardDashColor,
            borderRadius: '0.5rem 0.5rem 0 0',
            height: '5px',
            width: '100%',
          }}
        />
        <div className="ph3">
          <div className="flex mt3 mb3 mb4-m justify-between items-center relative">
            <input
              type="text"
              autoFocus
              onFocus={({ target }) => target.select()}
              name="cardName"
              defaultValue={textInputNameCard}
              onBlur={handleLeaveInputNameCard}
              onKeyDown={handleKeyDown}
              onChange={(event) => setTextInputNameCard(event.target.value)}
              className="f4 w-100 br2 bw1 b--moon-gray b--solid outline-0 ph2 gray ma0 fw5"
            />
            <button type="button" className="button-reset pointer gray hover-mid-gray textshadow-1">
              <FontAwesomeIcon icon="ellipsis-v" className="" />
            </button>
          </div>
          <form className="w-100 mb2">
            <div className="flex mt-4 mb-1">
              <input
                type="text"
                className="w-90 br2 pv1 pl3 bn shadow-6 lh-copy f6"
                placeholder="New item"
                readOnly
              />
              <button
                className="lh-copy w2-5 pointer ba br2 shadow-6 bg-moon-gray white ml1 b--light-gray dim"
                type="button"
              >
                <FontAwesomeIcon icon="plus" className="" style={{ width: '.575em' }} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CardBuilder.propTypes = {
  scrollToNewCard: PropTypes.func,
  newCard: PropTypes.func.isRequired,
};

CardBuilder.defaultProps = {
  scrollToNewCard: () => null,
};

export default CardBuilder;
