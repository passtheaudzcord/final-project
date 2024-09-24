import { Link } from "react-router-dom";

function AnimalCard({ animal }) {
    const { id, name, scientific_name, lifespan, about, fun_fact, food, img } = animal;


    return (
        <li className="card" id={id}>
            <figure className="image">
                <img src={img || "default-image.jpg"} alt={name} /> {/* Fallback image */}
            </figure>
            <section className="details">
                <Link to={`/artists/${id}`}>
                    <h2>{name}</h2>
                    <h3>{scientific_name}</h3>
                </Link>
                <p>{about}</p>
                <p>
                    {lifespan}, {fun_fact}, {food}
                </p>
            </section>
        </li>
    );
}

export default AnimalCard;