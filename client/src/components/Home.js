import { useEffect, useState } from "react";
import AnimalList from "./AnimalList";
import EditAnimal from './EditAnimal'; // Import your EditAnimal component
import AnimalForm from "./AnimalForm";
import OceanList from "./OceanList";
import Search from "./Search";

function HomePage() {
  const [animals, setAnimal] = useState([]);
  const [oceans, setOcean] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5555/animals")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("Could not fetch the data from promise");
        }
      })
      .then((data) => setAnimal(data))
      .catch((err) =>
        console.error("Was unable to reach the server for GET Request", err)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5555/oceans")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("Could not fetch the data from promise");
        }
      })
      .then((data) => setOcean(data))
      .catch((err) =>
        console.error("Was unable to reach the server for GET Request", err)
      );
  }, []);

  const updateSearch = (newSearch) => setSearch(newSearch);

  const addAnimal = (newAnimal) => {
    setAnimal((prevAnimals) => [...prevAnimals, newAnimal]);
  };

  const filteredAnimals = animals.filter((curAnimal) => {
    return (
      (curAnimal.name && curAnimal.name.toLowerCase().includes(search.toLowerCase())) ||
      (curAnimal.scientific_name && curAnimal.scientific_name.toLowerCase().includes(search.toLowerCase()))
    );
  });
  
  const filteredOceans = oceans.filter((curOcean) => {
    return curOcean.name && curOcean.name.toLowerCase().includes(search.toLowerCase());
  });

  function updateAnimalFavorite(updatedAnimal) {
    setAnimal(
      animals.map((prevAnimal) => {
        if (updatedAnimal.id === prevAnimal.id) {
          return { ...prevAnimal, favorite: updatedAnimal.favorite };
        } else {
          return prevAnimal;
        }
      })
    );
  }

  function updateOceanFavorite(updatedOcean) {
    setOcean(
      oceans.map((prevOcean) => {
        if (updatedOcean.id === prevOcean.id) {
          return { ...prevOcean, favorite: updatedOcean.favorite };
        } else {
          return prevOcean;
        }
      })
    );
  }

  const deleteAnimal = (id) => {
    setAnimal(animals.filter((animal) => animal.id !== id));
  };

  const deleteOcean = (id) => {
    setOcean(oceans.filter((ocean) => ocean.id !== id));
  };

  const deleteAnimalFromFavorites = (id) => {
    setAnimal(
      animals.map((animal) =>
        animal.id === id ? { ...animal, favorite: false } : animal
      )
    );
  };

  const deleteOceanFromFavorites = (id) => {
    setOcean(
      oceans.map((ocean) =>
        ocean.id === id ? { ...ocean, favorite: false } : ocean
      )
    );
  };

  return (
    <>
      <h1>Endemic Ocean Animals</h1>
      <div>
      <Search search={search} updateSearch={updateSearch} addAnimal={addAnimal} />
        <AnimalList
          animals={filteredAnimals}
          updateFavorite={updateAnimalFavorite}
          deleteAnimal={deleteAnimal}
          deleteFromFavorites={deleteAnimalFromFavorites}
          showDeleteButton={true}
          hideFavoriteButton={false}
          isFavoritePage={false}
          />
        <AnimalForm 
          addAnimal={addAnimal} />
        <OceanList
          oceans={filteredOceans}
          updateFavorite={updateOceanFavorite}
          deleteOcean={deleteOcean}
          deleteFromFavorites={deleteOceanFromFavorites}
          showDeleteButton={true}
          hideFavoriteButton={false}
          isFavoritePage={false}
        />
      </div>
    </>
  );
}

export default HomePage;