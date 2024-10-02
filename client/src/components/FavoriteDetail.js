import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/favorites")
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => setFavorites(data))
            .catch(err => console.error(err));
    }, []);

    if (!favorites.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="favorites-list">
            {favorites.map((favorite) => (
                <div className="favorite" key={favorite.id}>
                    <div className="animalimg">
                        <img src={favorite.img}/> {/* Assuming ocean.img contains the image URL */}
                    </div>
                    <div className="favorite-content">
                        <Link className="favorite-link" to={`/favorite/${favorite.id}`}>
                            <h1>{favorite.name}</h1>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FavoritesList;