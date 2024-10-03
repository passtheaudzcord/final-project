import React from "react";
import OceanCard from "./OceanCard";

function OceanList({
  oceans,
  updateFavorite,
  deleteOcean, // Include this prop
  deleteFromFavorites,
  hideFavoriteButton,
  isFavoritePage,
  showDeleteButton,
}) {
  return (
    <ul>
      {oceans.map((ocean) => (
        <OceanCard
          key={ocean.id}
          ocean={ocean}
          updateFavorite={updateFavorite}
          deleteOcean={deleteOcean} // Now correctly passed as a prop
          deleteFromFavorites={deleteFromFavorites}
          showDeleteButton={showDeleteButton}
          hideFavoriteButton={hideFavoriteButton}
          isFavoritePage={isFavoritePage}
        />
      ))}
    </ul>
  );
}

export default OceanList;