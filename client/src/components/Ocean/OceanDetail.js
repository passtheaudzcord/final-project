import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function OceanDetail() {
    const [ocean, setOcean] = useState(null);
    const [relatedOceans, setRelatedOceans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the specific ocean details
        fetch(`http://127.0.0.1:5555/ocean/${params.id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch ocean details");
                }
                return res.json();
            })
            .then(data => {
                setOcean(data);
                return fetch("http://127.0.0.1:5555/oceans"); // Fetch related oceans
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch related oceans");
                }
                return res.json();
            })
            .then(data => {
                setRelatedOceans(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Ocean not found");
                setLoading(false);
            });
    }, [params.id, navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const { id, name, avg_depth, deepest_point, surface_area, about, ofun_fact, img, map } = ocean;

    return (
        <div className="ocean-detail" id={id}>
            <h1>{name}</h1>
            <p>{about}</p>
            <div className="ocean-card">
                <figure className="image">
                    <img src={img || "default-image.jpg"} alt={`${name} image`} />
                    <section>
                        <p>Average Depth: {avg_depth}</p>
                        <p>Deepest Point: {deepest_point}</p>
                        <p>Surface Area: {surface_area}</p>
                        <p>Fun Fact: {ofun_fact}</p>
                        <p>Map: <a href={map} target="_blank" rel="noopener noreferrer">{map}</a></p>
                    </section>
                </figure>
                <section className="details">
                    <h3>Related Oceans:</h3>
                    <ul className="oceans-list">
                        {relatedOceans.map(ocean => (
                            <li key={ocean.id}>
                                <img
                                    width="100px"
                                    src={ocean.img || "default-image.jpg"}
                                    alt={ocean.name}
                                />
                                <div className="ocean-member">
                                    <Link to={`/oceans/${ocean.id}`}>
                                        <p className="ocean-name">{ocean.name}</p>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default OceanDetail;