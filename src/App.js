import "./App.css"
import { useState, useEffect } from "react";
import CardContainer from "./components/CardContainer";

function App() {
  let today;
  let currYear;
  let key = "5x8jye659ANN9AhcRH6efnk0lMastohE8JxFLFV1";
  const [cards, setCards] = useState([]);
  const [imageDate, setImageDate] = useState({
    month: "06",
    day: "16",
    year: "1995",
  });

  useEffect(() => {
    generateRandomDate();
  }, [cards]);

  const dateToday = () => {
    let date = new Date();

    let fixedMonth = date.getMonth() + 1;
    let month = fixedMonth.toString();
    let day = date.getDate().toString();
    let year = date.getFullYear().toString();

    if (day === "32") day = "1";
    if (month === "12") month = "1";
    if (month.length === 1) month = month.padStart(2, "0");
    if (day.length === 1) day = day.padStart(2, "0");

    today = `${year}-${month}-${day}`;
    currYear = year;
  };

  dateToday();

  const fetchImage = async () => {
    let res = await fetch(
      `https://api.nasa.gov/planetary/apod?date=${imageDate.year}-${imageDate.month}-${imageDate.day}&api_key=${key}`
    );
    let req = await res.json();
    return req;
  };

  const postImage = async () => {
    console.log(imageDate);
    let object = await fetchImage();
    let res = await fetch(`http://localhost:3001/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        date: object.date,
        title: object.title,
        url: object.url,
        explanation: object.explanation,
        likes: "0",
      }),
    });
    let req = await res.json();
  };

  const handleDateInput = (e) => {
    let date = e.target.value;
    let day = date.slice(8, 10);
    let month = date.slice(5, 7);
    let year = date.slice(0, 4);

    setImageDate({
      month: month,
      day: day,
      year: year,
    });
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (imageDate.month === "" || imageDate.day === "" || imageDate.year === "")
      window.alert("Please enter a valid date.");
    postImage();
  };

  const generateRandomDate = () => {
    let month = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
    let day = Math.floor(Math.random() * (28 - 1 + 1)) + 1;
    let year = Math.floor(Math.random() * (currYear - 1995 + 1)) + 1995;

    month = month.toString();
    day = day.toString();
    year = year.toString();

    if (day.length === 1) day = day.padStart(2, "0");
    if (month.length === 1) month = month.padStart(2, "0");

    setImageDate({
      month: month,
      day: day,
      year: year,
    });
  };

  const handleRandomDate = () => {
    generateRandomDate();
    postImage();
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3001/images");
      const req = await res.json();
      setCards(req);
    };

    fetchData().catch(console.error);
  }, [cards]);

  return (
    <div className="body">
      <br />
      <header className="header" id="glow">
        NASA Astronomy Pictures of the Day
      </header>
      <br />
      <div className="date-input">
        <h2 className="date-label">
          Choose a date between 06/16/1995 and Today's Date:{" "}
        </h2>
        <input
          type="date"
          className="dateInput"
          min="1995-06-16"
          max={today}
          onChange={handleDateInput}
        ></input>
        <span>  </span>
        <button className="add-image" onClick={handleAddImage}>
          Add Image
        </button>
      </div>
      <span className="space"></span>
      <p className="or"> or </p>
      <button className="random-image" onClick={handleRandomDate}>
        Find a random image
      </button>
      <br />
      <span className="space"></span>
      <div className="card-container">
        <CardContainer cards={cards} setCards={setCards} />
      </div>
    </div>
  );
}

export default App;
