import { Link } from "react-router-dom";

function OceanCard({ artist }) {
    const { id, name, avg_depth, deepest_point, surface_area, about, ofun_fact, img, map } = artist;


    return (
        <li className="card" id={id}>
            <figure className="image">
                <img src={img || "default-image.jpg"} alt={name} /> {/* Fallback image */}
            </figure>
            <section className="details">
                <Link to={`/oceans/${id}`}>
                    <h2>{name}</h2>
                </Link>
                <p>{about}</p>
                <p>
                    {avg_depth}, {deepest_point}, {surface_area}, {ofun_fact}, {map}
                </p>
            </section>
        </li>
    );
}

export default OceanCard;