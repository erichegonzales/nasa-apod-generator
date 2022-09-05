import { FaHeart, FaHeartBroken, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

const Card = ({ card }) => {
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
  };

  return (
    <div className="card">
      <h1>{date}</h1>
      <h2>{title}</h2>
      <img src={url} alt={title} />
      <p>{explanation}</p>
      <span className="icons">
        <p
          className="fa-solid fa-heart-crack"
          onClick={() => setLikesCount(parseInt(likesCount - 1))}
        >
          <FaHeartBroken></FaHeartBroken> {likesCount}
        </p>
        <p
          className="fa fa-heart"
          onClick={() => setLikesCount(parseInt(likesCount + 1))}
        >
          <FaHeart></FaHeart> {likesCount}
        </p>
        <p className="fa-solid fa-trash-can" onClick={() => removeCard()}>
          <FaTrashAlt></FaTrashAlt>
        </p>
      </span>
    </div>
  );
};

export default Card;
