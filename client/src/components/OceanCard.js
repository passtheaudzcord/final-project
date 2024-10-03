import React from "react";

function OceanCard({ ocean, updateOcean, handleDelete }) {
  function handleLike() {
    fetch(`http://localhost:5555/oceans/${ocean.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: ocean.likes + 1 }) // Use ocean.likes
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error('Patch went wrong');
        }
      })
      .then(data => {
        updateOcean(data); // Make sure updateOcean is passed as a prop
      })
      .catch(err => console.error('Could not reach server', err));
  }

  return (
    <div className="card">
      <h2>{ocean.name}</h2>
      <h3>{ocean.avg_depth}</h3>
      <h4>{ocean.deepest_point}</h4>
      <h4>{ocean.surface_area}</h4>
      <h4>{ocean.fun_fact}</h4>
      <h4>{ocean.about}</h4>
      <img src={ocean.img} alt={ocean.name} className="ocean-avatar" />
      <h4>{ocean.map}</h4>
      <button onClick={handleLike} className="like-btn">
        Like {"<3"}
      </button>
      <button onClick={() => handleDelete(ocean.id)} className="del-btn">
        Favorite
      </button>
    </div>
  );
}

export default OceanCard;