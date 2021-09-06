import React, { useState } from "react";
import axios from "axios";
import Result from "./Result";
import Photos from "./Photos";
import "./Dictionary.css";

export default function Dictionary(props) {
  const languages = [
    { id: 0, cod: "en_US", language: "English (US)" },

  ];
  let [language] = useState({
    cod: languages[0].cod,
    language: languages[0].language,
  });
  let [keyword, setKeyword] = useState(props.keyword);
  let [result, setResult] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos] = useState([]);

  function handleKeyword(e) {
    setKeyword(e.target.value.trim());
  }

  function handleResponse(response) {
    setResult(response.data[0]);
  }

  function handleError(error) {
    console.clear(error);

    alert(
      `Sorry, we can't find the definition of "${keyword}" 
Please type the correct word in ${language.language} 😮`
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    search(keyword);
  }

  function load() {
    search(keyword);
    setLoaded(true);
  }

  function search(keyword) {
    setKeyword(keyword);
    //Documentation: https://dictionaryapi.dev/
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/${language.cod}/${keyword}`;
    axios.get(apiUrl).then(handleResponse).catch(handleError);
  }

  function quickSelection(e) {
    e.preventDefault();
    search(e.target.innerHTML);
  }

  let lists = ["motivation", "heart", "joy", "view", "moon"];

  let form = (
    <section>
      <p>What word do you want to find? 🔍</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="search"
            name="search"
            placeholder="Search for a word!"
            defaultValue={keyword}
            onChange={handleKeyword}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleSubmit}
          >
            Let's GO!
          </button>
        </div>

      </form>
      <div className="hint">
        <p>Get definitions, synonyms, translations and more.</p>
        <p>Here's a few examples:</p>
      </div>
      <div className="list">
        <ul>
          {lists.map(function (list, index) {
            return (
              <li key={index}>
                <a href="/" onClick={quickSelection}>
                  {list}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );

  if (loaded) {
    return (
      <div className="Dictionary">
        {form}
        <Result result={result} search={search} setKeyword={setKeyword} />
        <Photos photos={photos} />
      </div>
    );
  } else {
    load();
    return (
      <div className="Dictionary">
        {form}
        Loading...
      </div>
    );
  }
}
