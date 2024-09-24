import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AnimalDetail() {
    const [animal, setAnimal] = useState({
        pod: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/animal/${params.id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch animal");
                }
                return res.json();
            })
            .then(data => {
                setAnimal(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Animal not found");
                setLoading(false)
            });
    }, [params.id, navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const { id, name, scientific_name, lifespan, about, fun_fact, food, img } = animal;

    return (
        <div className="animal-detail" id={id}>
            <h1>{name}</h1>
            <p>{about}</p>
            <div className="animal-card">
                <figure className="image">
                    <img src={img || "default-image.jpg"} /> 
                    <section>
                        <p>Scientific Name: {scientific_name}</p>
                        <p>Lifespan: {lifespan}</p>
                        <p>Fun Fact: {fun_fact}</p>
                        <p>Food: {food}</p>
                    </section>
                </figure>
                <section className="details">
                    <h3>Pod:</h3>
                    <ul className="songs">
                        {animals.map((animal) => (
                            <li key={animal.id}>
                                <img
                                    width="100px"
                                    src={animal.img || "default-image.jpg"} 
                                    alt={animal.name}
                                />
                                <div className="animal-member">
                                    <Link to={`/animals/${animal.id}`}>
                                        <p className="animal-name">{animal.name}</p>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            <section className="comments">
                <h2>Submit your review!</h2>
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Add a comment"
                        rows="4"
                        style={{ width: "100%" }}
                    />
                    <button type="submit">Submit</button>
                </form>
                <ul>
                    {comments.map((com, index) => (
                        <li key={index}>{com}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default AnimalDetail;