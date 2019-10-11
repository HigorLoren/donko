import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card/Card';
import CardBuilder from './CardBuilder/CardBuilder';

const Cards = props => {
  return (
    <React.Fragment>
      {props.cards.map(card => {
        return (
          <Card
            key={card.id}
            cardId={card.id}
            cardName={card.name}
            notes={card.notes}
            dashColor={card.dashColor}
            deleteMe={() => props.deleteCard(card)}
          />
        );
      })}
      <CardBuilder scrollToNewCard={props.scrollToNewCard} newCard={card => props.newCard(card)} />
    </React.Fragment>
  );
};

Cards.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  newCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  scrollToNewCard: PropTypes.func
};

Cards.defaultProps = {
  scrollToNewCard: () => null
};

export default Cards;
