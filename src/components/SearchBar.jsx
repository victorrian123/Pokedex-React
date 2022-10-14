import React from "react";
import { useState } from "react";
import { searchPokemon } from "../Api";

const SearchBar = ({ onSearchHandler }) => {
  const [search, setSearch] = useState("");
  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    if (e.target.value === 0) {
      onSearchHandler(undefined);
    }
  };

  const onClickHandler = () => {
    onSearchHandler(search);
  };

  return (
    <div className='searchbar-container'>
      <div className='searchbar'>
        <input
          type='text'
          placeholder='Buscar Pokemon'
          onChange={onChangeHandler}
        />
      </div>
      <div className='searchbar-btn'>
        <button onClick={onClickHandler}>Buscar</button>
      </div>
    </div>
  );
};

export default SearchBar;
