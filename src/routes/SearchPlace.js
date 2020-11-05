import React, { useState } from "react";
import MapContainer from "../components/MapContainer";
import "../css/Searchplace.css";

const SearchPlace = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <>
      <div id="Searchplace">
        <form id="inputPlaceForm" onSubmit={handleSubmit}>
          <input
            placeholder="장소 검색"
            onChange={onChange}
            value={inputText}
            maxLength="20"
          />
          <button type="submit">검색</button>
        </form>
        <MapContainer searchPlace={place} />
      </div>
    </>
  );
};

export default SearchPlace;
