import { FaHeart, FaHeartBroken, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";

const Card = ({ card }) => {
  const { date, title, url, explanation, likes, id } = card;
  const [likesCount, setLikesCount] = useState(likes);
  const [removeCard, setRemoveCard] = useState(false);

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
    };
    fetchData().catch(console.error);
  }, [likesCount]);

//    useEffect(() => {
//      const fetchData = async () => {
//        const res = await fetch(`http://localhost:3001/images/${id}`, {
//          method: "DELETE",
//          headers: {
//            "Content-Type": "application/json",
//            Accept: "application/json",
//          },
//        });
//      };
//      fetchData().catch(console.error);
//    }, [removeCard]);

  return (
    <div className="card">
      <h1>{date}</h1>
      <h2>{title}</h2>
      <img src={url} alt={title} />
      <p>{explanation}</p>
      <span>
        <p onClick={() => setLikesCount(parseInt(likesCount - 1))}>
          <FaHeartBroken></FaHeartBroken> {likesCount}
        </p>
        <p onClick={() => setLikesCount(parseInt(likesCount + 1))}>
          <FaHeart></FaHeart> {likesCount}
        </p>
        <p onClick={() => setRemoveCard(!removeCard)}>
          <FaTrash></FaTrash>
        </p>
      </span>
    </div>
  );
};

export default Card;
