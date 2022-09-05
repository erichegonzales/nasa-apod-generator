import { FaHeart, FaHeartBroken, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

const Card = ({ card, cards, setCards }) => {
  const { date, title, url, explanation, likes, id } = card;
  const [likesCount, setLikesCount] = useState(likes);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3001/images/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          likes: likesCount,
        }),
      });
      const req = res.json();
    };
    fetchData().catch(console.error);
  }, [likesCount]);

   const fetchCards = async () => {
     const res = await fetch("http://localhost:3001/images");
     const req = await res.json();
     setCards(req);
   };

  const removeCard = () => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3001/images/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const req = res.json();
    };
    fetchData().catch(console.error);
    fetchCards();
  };

  return (
    <div className="card">
      <h1>{date}</h1>
      <h2>{title}</h2>
      <img src={url} alt={title} />
      <br/>
      <p className="explanation">{explanation}</p>
      <div className="icons">
        <div className="fa-solid fa-trash-can" onClick={() => removeCard()}>
          <FaTrashAlt></FaTrashAlt>
        </div>
        <div
          className="fa-solid fa-heart-crack"
          onClick={() => setLikesCount(parseInt(likesCount - 1))}
        >
          <FaHeartBroken></FaHeartBroken>
        </div>
        <div
          className="fa fa-heart"
          onClick={() => setLikesCount(parseInt(likesCount + 1))}
        >
          <FaHeart className="heart-icon"></FaHeart>
        <h3 className="likes"><span> </span>{likesCount}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
