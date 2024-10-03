import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function AnimalCard({ 
    animal, 
    deleteAnimal, 
    updateAnimal, 
    userId, 
    updateFavorite, 
    deleteFromFavorites, 
    isFavoritePage 
}) {
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState(animal.favorite);

    const toggleFavorite = (event) => {
        event.preventDefault();
        setFavorite((prev) => !prev);
    };

    useEffect(() => {
        if (favorite !== animal.favorite) {
            fetch(`http://localhost:5555/animals/${animal.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ favorite }),
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Patch failed");
                }
            })
            .then((data) => {
                updateFavorite(data);
            })
            .catch((err) => console.error("Couldn't reach server", err));
        }
    }, [favorite, animal.id, updateFavorite]);

    const handleRemoveFromFavorites = (event) => {
        event.preventDefault();
        fetch(`http://localhost:5555/animals/${animal.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ favorite: false }),
        })
        .then((res) => {
            if (res.ok) {
                deleteFromFavorites(animal.id);
            } else {
                throw new Error("Remove from favorites failed");
            }
        })
        .catch((err) => console.error("Couldn't reach server", err));
    };

    const handleDelete = (event) => {
        event.preventDefault();
        fetch(`http://localhost:5555/animals/${animal.id}`, {
            method: "DELETE",
        })
        .then((res) => {
            if (res.ok) {
                deleteAnimal(animal.id);
            } else {
                throw new Error("Delete failed");
            }
        })
        .catch((err) => console.error("Couldn't reach server", err));
    };

    const handleFavorite = (event) => {
        event.preventDefault();
        fetch("http://localhost:5555/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: userId,
                animal_id: animal.id,
            }),
        })
        .then(res => {
            if (res.ok) {
                navigate('/favorites');
            } else {
                throw new Error("Failed to add favorite");
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <div className="card">
            <h2>{animal.name}</h2>
            <h3><b>Scientific Name: </b>{animal.scientific_name}</h3>
            <h4><b>Lifespan: </b>{animal.lifespan}</h4>
            <h4><b>About: </b>{animal.about}</h4>
            <h4><b>Fun Fact: </b>{animal.fun_fact}</h4>
            <h4><b>Food: </b>{animal.food}</h4>
            <h4><b>Ocean: </b>{animal.ocean}</h4>
            <img src={animal.img} alt={animal.name} className="animal-avatar" />
            <button onClick={toggleFavorite} className="favorite-button">
                {favorite ? "Unfavorite" : "Favorite"}
            </button>
            {isFavoritePage ? (
                <button onClick={handleRemoveFromFavorites} className="remove-favorite-button">
                    Remove from Favorites
                </button>
            ) : (
                <div>
                    <button onClick={handleDelete} className="del-btn">
                        Delete
                    </button>
                    <button>
                        <Link to={`/animals/edit/${animal.id}`}>Edit</Link>
                    </button>
                </div>
            )}
        </div>
    );
}

export default AnimalCard;