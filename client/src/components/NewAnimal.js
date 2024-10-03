import { useState } from "react";
import AnimalForm from "./AnimalForm";

function NewAnimal() {
  const [animals, setAnimals] = useState([]);

  const addAnimals = (newAnimal) => {
    setAnimals((prevAnimals) => [...prevAnimals, newAnimal]);
  };

  return (
    <>
      <div>
        <AnimalForm addAnimals={addAnimals} />
        <ul>
          {animals.map((animal, id) => (
            <li key={id}>
              {animal["animal-name"]}, {animal["scientific-name"]},
              <img src={animal.image} alt="" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default NewAnimal;