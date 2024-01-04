import React, { useState, useEffect, useRef } from "react";
import "./Landing.css";
import ZeviLogo from "../../assets/logo.png";
import VirgioLogo from "../../assets/virgio.jfif";
import Suggestions from "./components/Suggestions/Suggestions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";
// import SearchButton from "./search-button.png";

const Landing = () => {
  const input = useRef(null);
  const [suggestionsDisplay, setSuggestionsDisplay] = useState(false);
  const [query, setQuery] = useState("");
  const [disableSearchButton, setDisableSearchButton] = useState(true);

  const history = useNavigate();

  useEffect(() => {
    if (query.length === 0) {
      setSuggestionsDisplay(false);
    }
  }, [query]);

  useEffect(() => {
    if (query.trim().length !== 0) {
      setDisableSearchButton(false);
    }
  }, [query]);
  return (
    <div className="main-container">
      <div className="head-nav">
        <img
          style={{
            height: "44px",
          }}
          className="zevi-logo"
          src={ZeviLogo}
          alt="Logo"
          width="100px"
        />
        {/* <img
          style={{
            marginTop: "8px",
          }}
          className="vendor-logo"
          src={VirgioLogo}
          alt="Logo"
          width="80px"
        /> */}
      </div>
      <div className="search-box" ref={input}>
        <div className="searchbar">
          <form>
            <input
              type="search"
              placeholder="Search"
              onChange={(event) => {
                setSuggestionsDisplay(true);
                setQuery(event.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  setSuggestionsDisplay(false);
                  if (query.trim().length !== 0) {
                    history(`/search/?q=${query}`);
                  } else {
                    alert("Enter your query in the search bar");
                  }
                }
              }}
            />
            <Link
              onClick={(event) => (!query ? event.preventDefault() : null)}
              to={`search/?q=${query}`}
            >
              {/* <input
                type="button"
                value="Search"
                disabled={disableSearchButton}
              /> */}
              <Unicons.UilSearch
                style={{
                  padding: "10px",
                  cursor: "pointer",
                }}
              />
            </Link>
          </form>
        </div>
        <div
          className="suggestions landing"
          style={{
            left: input.current?.offsetLeft,
            maxWidth: window.innerWidth - input.current?.offsetLeft - 20,
          }}
        >
          {suggestionsDisplay ? (
            <Suggestions displaySuggestions={true} query={query} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Landing;
