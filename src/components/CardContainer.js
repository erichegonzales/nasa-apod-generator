import Card from "./Card";

const CardContainer = ({ cards, setCards }) => {
  const imageCards = cards.map((card) => {
    return <Card key={card.id} card={card} cards={cards} setCards={setCards} />;
  });

  return imageCards;
};

export default CardContainer;
