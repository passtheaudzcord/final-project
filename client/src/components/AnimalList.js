import React from "react";
import AnimalCard from "./AnimalCard";

function AnimalList({
  animals,
  updateFavorite,
  deleteAnimal,
  deleteFromFavorites,
  showDeleteButton,
  hideFavoriteButton,
  isFavoritePage,
}) {
  return (
    <ul>
      {animals.map((animal) => (
        <AnimalCard
          key={animal.id}
          animal={animal}
          updateFavorite={updateFavorite}
          deleteAnimal={deleteAnimal}
          deleteFromFavorites={deleteFromFavorites}
          showDeleteButton={showDeleteButton}
          hideFavoriteButton={hideFavoriteButton}
          isFavoritePage={isFavoritePage}
        />
      ))}
    </ul>
  );
}

export default AnimalList;