import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./Search.css";
import ZeviLogo from "../../assets/logo.png";
import * as Unicons from "@iconscout/react-unicons";
import Card from "./components/Card/Card";
import { useLocation, useNavigate } from "react-router-dom";
import Suggestions from "../Landing/components/Suggestions/Suggestions";
import SearchResults from "./SearchResults";

export const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const store = process.env.REACT_APP_DEFAULT_STORE;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [products, setProducts] = useState([]);
  const [suggestionsDisplay, setSuggestionsDisplay] = useState(true);
  const [query, setQuery] = useState(
    new URLSearchParams(location.search).get("q") || ""
  );
  const [newQuery, setNewQuery] = useState("");
  const [reset, setReset] = useState(false);
  // const [settingsOpen, setSettingsOpen] = useState(true);
  // const [searchType, setSearchType] = useState(
  //   new URLSearchParams(location.search).get("type") || "simple"
  // );
  // const [personalizedUser, setPersonalizedUser] = useState(
  //   new URLSearchParams(location.search).get("user") || "-1"
  // );
  const input = useRef(null);

  // const options = [
  //   {
  //     label: "Simple Search",
  //     value: "simple",
  //   },
  //   {
  //     label: "Revenue Ranking",
  //     value: "revenue",
  //   },
  //   {
  //     label: "Personalized",
  //     value: "personalized",
  //   },
  // ];

  const users = [
    // {
    //   label: "No User",
    //   value: "-1",
    // },
    {
      label: "User 1 - 364507",
      value: "364507",
    },
    {
      label: "User 2 - I370915",
      value: "I370915",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      navigate(`/?q=${query}`);
      const apiurl = `${baseUrl}/search/?store=${store}&limit=100&usecache=False&q=${query}`;
      const apiurl_localdev = `${baseUrl}/search?query=${query}`;
      const data = await axios.get(
        // apiurl_localdev
        apiurl
      );
      // console.log(apiurl1);
      // console.log(query);
      console.log(data.data.ranked_list);
      setProducts(data.data.ranked_list);
    };

    fetchProducts();
  }, [setProducts, query, navigate]);

  useEffect(() => {
    if (newQuery.length === 0) {
      setSuggestionsDisplay(false);
    }
  }, [newQuery]);

  return (
    <div>
      <div className="search-area">
        <div>
          <img
            className="zevi-logo"
            style={{ paddingBottom: "20px" }}
            src={ZeviLogo}
            alt="Logo"
            width="80px"
            onClick={(e) => {
              e.preventDefault();
              setProducts([]);
              if (query) {
                setQuery("");
                setNewQuery("");
                // navigate('/');
              } else {
                window.location.reload();
                // navigate("/?q=");
              }

              // setReset(true);

            }}
          />
          {/* <img
            className="vendor-logo"
            src={VirgioLogo}
            alt="Logo"
            width="80px"
          /> */}
        </div>
        <div className="searchbar-search" ref={input}>
          <form >
            <input
              type="search"
              value={newQuery}
              placeholder="Search"
              onChange={(e) => {
                setNewQuery(e.target.value);
                setSuggestionsDisplay(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  // window.location.href = `/?q=${newQuery}`;
                  if (newQuery.trim().length !== 0) {
                    setQuery(newQuery);
                    setSuggestionsDisplay(false);
                    navigate(`/?q=${newQuery}`);
                  }
                }
              }}
            // defaultValue={query?.replace(/%20/g, " ") || ""}
            />
            <Unicons.UilSearch
              onClick={() => {
                navigate(`/?q=${newQuery}`);
                setQuery(newQuery);
                setSuggestionsDisplay(false);
              }}
              style={{
                padding: "10px",
                borderRight: "1px solid #ccc",
                cursor: "pointer",
                borderColor: "transparent",
              }}
            />
            {/* <Unicons.UilSetting
              onClick={() => {
                setSettingsOpen(!settingsOpen);
              }}
              style={{
                padding: "10px 4px 10px 10px",
                cursor: "pointer",
              }}
            /> */}
            {/* <div>
            </div> */}
          </form>
        </div>
      </div>
      <div
        className="suggestions"
        style={{
          left: input.current?.offsetLeft,
          maxWidth: window.innerWidth - input.current?.offsetLeft - 20 || "",
        }}
      >
        {suggestionsDisplay ? (
          <Suggestions displaySuggestions={true} query={newQuery} />
        ) : null}
      </div>
      {/* 
      <div
        className="config"
        style={settingsOpen ? { display: "flex" } : { display: "none" }}
      >
        <div className="config-section">
          <div className="config-title">Search Type</div>
          <select
            onChange={(e) => setSearchType(e.target.value)}
            defaultValue={searchType}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {searchType === "personalized" ? (
          <div className="config-section">
            <div className="config-title">Personalization User</div>
            <select
              onChange={(e) => setPersonalizedUser(e.target.value)}
              defaultValue={personalizedUser}
            >
              {users.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="config-section config-desc">
          {searchType === "simple" ? (
            <>
              Simple Search: This search is just plain NLP search at play with
              no post processing (Hindi+English)
            </>
          ) : searchType === "revenue" ? (
            <>
              Revenue Ranking: The results shown here are reranked based on
              revenue(Randomly generated)
            </>
          ) : (
            <>
              Personalised: The ranking is tailored based on the stores BPM seq
              code
            </>
          )}
        </div>
      </div> */}
      {/* <div className="heading-container">
        <div className="heading">
          Search Results
        </div>
        <div className="sub-heading">
          Showing {products.length} results for "{query}"
        </div>
      </div> */}

      {query && (
        <>
          <SearchResults products={products} query={query} />
        </>
      )}

      <div className="container">
        <div className="results-area">
          <div className="search-results">
            {products?.map((product, index) => (
              <Card
                key={index}
                product={product}
              // BRAND_NAME={product.BRAND_NAME}
              // BASEPACK_DESC_CLEAN={product.BASEPACK_DESC_CLEAN}
              // BASEPACK_CODE={product.BASEPACK_CODE}
              // REVENUE={
              //   searchType === "revenue"
              //     ? product.zevi_computed_revenue
              //     : null
              // }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
