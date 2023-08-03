import React from 'react';
import './SearchBar.css';
import './font.css';

const SearchBar = ({ query, setQuery, search }) => {
  return (
    <div className="search">
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Enter City Name"
        className="searchTerm"
      />
      <button onClick={search} className="searchButton">
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
