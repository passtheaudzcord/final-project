import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AnimalsPage = () => {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/animals")
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => setAnimals(data))
            .catch(err => console.error(err));
    }, []);

    if (!animals.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="animals-list">
            {animals.map((animal) => (
                <div className="animal" key={animal.id}>
                    <div className="animalimg">
                        <img src={animal.img} alt={animal.name} /> {/* Assuming ocean.img contains the image URL */}
                    </div>
                    <div className="animal-content">
                        <Link className="animal-link" to={`/animal/${animal.id}`}>
                            <h1>{animal.name}</h1>
                        </Link>
                        <p>{animal.about}</p>
                        {/* <Link to={`/animal/${animal.id}`}> */}
                        <button>Learn more</button>
                        {/* </Link> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnimalsPage;