import React, { useState, useEffect } from "react";
import "./Card.css";

export default function Card() {
  const [isLoaded, setIsLoader] = useState(false);
  const [error, setError] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("Click 'New Quote' to generate a quote");

  const fetchData = () => {
    return fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then(
        (data) => {
          setQuotes(data);
          setIsLoader(true);
        },
        (error) => {
          setError(error.message);
        }
      );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const randomQuotes = () => {
    const randomNum = Math.floor(Math.random() * 1000);
    const quoteText = quotes[randomNum].text;
    const quoteAuthor = quotes[randomNum].author;
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = `#${randomColor}`;
    setText(quoteText);
    setAuthor(quoteAuthor);
  };

  return isLoaded ? (
    <div id="quote-box">
      <h1 id="text">"{text}"</h1>
      <p id="author">{author}</p>
      <div className="bottom-section">
        <button
          id="new-quote"
          onClick={() => {
            randomQuotes();
          }}
        >
          New Quote
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text="${text}" ${author}`}
          id="tweet-quote"
        >
          Tweet Quote
        </a>
      </div>
    </div>
  ) : (
    <div>{error}</div>
  );
}
