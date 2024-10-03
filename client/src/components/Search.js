import React from "react";
import NewAnimal from "./NewAnimal"
import AnimalForm from "./AnimalForm"

function Search({ search, updateSearch, addAnimal }) {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Oceans and Endemic Animals:</label>
      <input
        value={search}
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={(e) => updateSearch(e.target.value)}
      />
      <AnimalForm addAnimal={addAnimal} />
    </div>
  );
}

export default Search;