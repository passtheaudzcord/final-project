import React, {useState} from "react";

//1. useState to represent form
//2. set values to represent whats in state
//3. onChange
function Search({ updateSearch }) {

  //using empty string instead of object because there's only one input and we aren't going to be saving this in our db.json 
  const [form, setForm] = useState('') 

  function handleSubmit(e) {
    e.preventDefault();
    updateSearch(form)
    setForm('')
  }
  
  function handleChange(e) {
    setForm(e.target.value)
  }

  return (
    <form className="searchbar" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        id="search"
        placeholder="Search"
        value={form}
        onChange={(e) => handleChange(e)}
      />
      <input type="submit" value="🔍" />
    </form>
  );
}

export default Search;