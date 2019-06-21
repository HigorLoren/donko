import React from "react";
import PropTypes from "prop-types";
import Cards from "../Cards/Cards";

const Board = props => {
  // @ Scroll to the right until get to the end
  const handleScrollToRightOfCardsZone = () => {
    let lastScroll;

    const slideToRightInterval = setInterval(() => {
      document.getElementById("cardsZone").scrollLeft += 10;
      if (lastScroll === document.getElementById("cardsZone").scrollLeft) {
        window.clearInterval(slideToRightInterval);
      }
      lastScroll = document.getElementById("cardsZone").scrollLeft;
    }, 25);
  };

  return (
    <div id="cardsZone" className="fl pa4 w-100 overflow-auto items-start flex z-0">
      {props.cards.length > 0 ? (
        <Cards
          cards={props.cards}
          newCard={props.handleNewCard}
          deleteCard={props.handleDeleteCard}
          scrollToNewCard={handleScrollToRightOfCardsZone}
        />
      ) : (
        <p className="fw1 f3 h100 flex items-center center light-silver">
          Select a board to start.
        </p>
      )}
    </div>
  );
};

Board.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDeleteCard: PropTypes.func.isRequired,
  handleNewCard: PropTypes.func.isRequired
};

export default Board;
