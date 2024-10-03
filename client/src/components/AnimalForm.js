import React, { useState, useEffect } from "react";
import Search from "./Search"

// Function to fetch oceans from an API
const fetchOceans = async () => {
    const response = await fetch('http://localhost:5555/oceans');
    if (!response.ok) {
      throw new Error('Failed to fetch oceans');
    }
    return response.json(); // Make sure to return the parsed JSON
  };

function AnimalForm({ addAnimal }) {
  const [form, setForm] = useState({
    name: '',
    scientific_name: '',
    lifespan: '',
    about: '',
    fun_fact: '',
    food: '',
    img: '',
    ocean: '' // This will hold the ocean ID
  });

  const [oceans, setOceans] = useState([]);

  useEffect(() => {
    const loadOceans = async () => {
      try {
        const oceanData = await fetchOceans();
        setOceans(oceanData);
      } catch (error) {
        console.error('Error fetching oceans:', error);
      }
    };

    loadOceans();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5555/animals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Post went wrong');
        }
      })
      .then((data) => {
        addAnimal(data); // Make sure addAnimal is called correctly
        setForm({ // Reset the form
          name: '',
          scientific_name: '',
          lifespan: '',
          about: '',
          fun_fact: '',
          food: '',
          img: '',
          ocean: '',
        });
      })
      .catch((err) => console.error('Couldn\'t reach server', err));
  };

  return (
    <div className="container">
      <form className="add-animal-form" onSubmit={handleSubmit}>
        <h3>Add an endemic animal!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter animal's common name..."
          className="input-text"
          value={form.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="scientific_name"
          placeholder="Enter animal scientific name"
          className="input-text"
          value={form.scientific_name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="lifespan"
          placeholder="Enter animal's lifespan"
          className="input-text"
          value={form.lifespan}
          onChange={handleChange}
        />
        <input
          type="text"
          name="about"
          placeholder="Enter information about the animal."
          className="input-text"
          value={form.about}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="fun_fact"
          placeholder="Enter a fun fact!"
          className="input-text"
          value={form.fun_fact}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="food"
          placeholder="Enter animal's food"
          className="input-text"
          value={form.food}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="img"
          placeholder="Enter image url"
          className="input-text"
          value={form.img}
          onChange={handleChange}
        />
        <br />
        <select name="ocean" value={form.ocean} onChange={handleChange} required>
          <option value="">Select Ocean</option>
          {oceans.map(ocean => (
            <option key={ocean.id} value={ocean.id}>
              {ocean.name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit" name="submit" className="submit">
          Add a new animal
        </button>
      </form>
    </div>
  );
}

export default AnimalForm;