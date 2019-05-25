import React from "react";
import Card from "./Card/Card";

const Cards = props =>
  props.cards.map(card => {
    return (
      <Card
        key={card.id}
        cardId={card.id}
        cardName={card.name}
        notes={card.notes}
        dashColor={card.dashColor}
      />
    );
  });

export default Cards;
