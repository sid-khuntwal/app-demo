import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Suggestions.css";

const Suggestions = ({ query }) => {
  const [suggestions, setSuggestions] = useState([]);
  const store = process.env.REACT_APP_DEFAULT_STORE;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    const getSuggestions = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/autocomplete/?store=${store}&q=${query}`
        );
        setSuggestions(res.data.autocomplete_list);
      } catch (err) {
        console.log(err);
      }
    };

    getSuggestions();
  }, [query]);

  return (
    <div className="suggestion-container">
      <div className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <>
            <a
              className="suggestion-links"
              key={index}
              onClick={(event) => (!suggestion ? event.preventDefault() : null)}
              href={`/search/?q=${suggestion}`}
            >
              <span
                style={{
                  fontSize: "14px",
                }}
              >
                {" "}
                {suggestion.replace(/\[SEP]/g, "")}
                <br />
              </span>
            </a>
          </>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
