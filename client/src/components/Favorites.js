import React, { useEffect, useState } from "react";
import AnimalCard from "./AnimalCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/favorites")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("Failed to fetch favorites");
        }
      })
      .then((data) => {
        const favoriteAnimals = data.filter((animal) => animal.favorite);
        setFavorites(favoriteAnimals);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  const updateFavorite = (updatedAnimal) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((animal) =>
        animal.id === updatedAnimal.id ? updatedAnimal : animal
      )
    );
  };

  const deleteFromFavorites = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((animal) => animal.id !== id)
    );
  };

  const deleteAnimal = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((animal) => animal.id !== id)
    );
  };

  return (
    <div>
      <h1>Favorite Animals</h1>
      <ul>
        {favorites.length === 0 ? (
          <p>No favorite animals added yet.</p>
        ) : (
          favorites.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              updateFavorite={updateFavorite}
              deleteFromFavorites={deleteFromFavorites}
              deleteAnimal={deleteAnimal}
              showDeleteButton={true}
              hideFavoriteButton={true}
              isFavoritePage={true}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default Favorites;