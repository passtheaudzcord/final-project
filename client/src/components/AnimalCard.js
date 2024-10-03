import React from "react";

function AnimalCard({ animal, deleteAnimal, updateAnimal }) {
	function handleLike() {
		fetch(`http://localhost:5555/animals/${animal.id}`, {
			method: "PATCH",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ likes: animal.likes + 1 })
		})
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        throw Error('patch went wrong')
      }
    })
    .then(data => {
      updateAnimal(data)
    })
    .catch(err => console.error('couldnt reach server'))
	}

	function handleDelete() {
		fetch(`http://localhost:5555/animals/${animal.id}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					deleteAnimal(animal.id);
				} else {
					throw Error("delete went wrong");
				}
			})
			.catch((err) => console.error("couldnt reach server"));
	}

	return (
		<div className="card">
			<h2>{animal.name}</h2>
            <h3>{animal.scientific_name}</h3>
            <h4>{animal.lifespan}</h4>
            <h4>{animal.about}</h4>
            <h4>{animal.fun_fact}</h4>
            <h4>{animal.food}</h4>
            <h4>{animal.ocean}</h4>
			<img src={animal.img} alt={animal.name} className="animal-avatar" />
			<p>{animal.likes} Likes </p>
			<button onClick={handleLike} className="like-btn">
				Like {"<3"}
			</button>
			<button onClick={handleDelete} className="del-btn">
				Favorite
			</button>
		</div>
	);
}

export default AnimalCard;