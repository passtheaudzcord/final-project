import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AnimalsPage = () => {
    const [animals, setAnimals] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate(); // Correct usage of useNavigate

    useEffect(() => {
        fetch("http://localhost:5555/animals")
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => setAnimals(data))
            .catch(err => console.error(err));
    }, []);

    const addToFavorites = (animal) => {
        if (!favorites.includes(animal.id)) {
            setFavorites([...favorites, animal.id]);
        }
    };

    const handleFavoritesClick = () => {
        navigate('/favorites'); // Correctly using navigate
    };

    if (!animals.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="animals-list">
            {animals.map((animal) => (
                <div className="animal" key={animal.id}>
                    <div className="animalimg">
                        <img src={animal.img} alt={animal.name} />
                    </div>
                    <div className="animal-content">
                        <Link className="animal-link" to={`/animal/${animal.id}`}>
                            <h1>{animal.name}</h1>
                        </Link>
                        <p>{animal.about}</p>
                        <button onClick={() => <Link className="animal-link" to={`/animal/${animal.id}`}></Link>}>Learn More</button>
                        <button onClick={() => addToFavorites(animal)}>Favorite</button>
                    </div>
                </div>
            ))}
            <button onClick={handleFavoritesClick} style={{ marginTop: '20px' }}>
                Go to Favorites
            </button>
        </div>
    );
};

export default AnimalsPage;