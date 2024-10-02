import React, { useState, useEffect } from 'react';
import AnimalDetail from '../AnimalsPage';
import { Link } from 'react-router-dom'; 

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5555/favorites')
      .then(response => response.json())
      .then(data => setFavorites(data))
      .catch(error => {
        setError(`Error fetching favorites: ${error.message}`);
        console.error('Fetch error:', error);
      });
  }, []);

  const handleDelete = (animalId) => {
    fetch(`http://localhost:5555/favorites/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        animal_id: animalId
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete favorite');
      }
     
      return fetch('http://localhost:5555/favorites');
    })
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        setFavorites([]); 
      } else {
        setFavorites(data); 
      }
    })
    .catch(error => {
      setError(`Error deleting favorite: ${error.message}`);
      console.error('Delete error:', error);
    });
  };
  

  const handleSave = (animalId) => {
    
    console.log(`Saved place with ID: ${animalId}`);
  };

  return (
    <div className="container">
      <header>
        <h1>My Favorite Animals</h1>
      </header>
      
      {favorites.length === 0 ? (
        <p>You have no favorite animals yet.</p>
      ) : (
        <section>
          <ul className="cards">
            {favorites.map(favorite => (
              <li key={favorite.id}>
                <AnimalDetail 
                  animal={favorite} 
                  onSave={handleSave} 
                  onDelete={handleDelete}
                />
                <Link to={`/animals/${favorite.id}`} >View Details</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Favorites;