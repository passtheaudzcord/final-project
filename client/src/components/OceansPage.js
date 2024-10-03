import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OceansPage = () => {
    const [oceans, setOceans] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetch("http://localhost:5555/oceans")
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => setOceans(data))
            .catch(err => console.error(err));
    }, []);

    if (!oceans.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="oceans-list">
            {oceans.map((ocean) => (
                <div className="ocean" key={ocean.id}>
                    <div className="oceanimg">
                        <img src={ocean.img} alt={ocean.name} />
                    </div>
                    <div className="ocean-content">
                        <Link className="ocean-link" to={`/ocean/${ocean.id}`}>
                            <h1>{ocean.name}</h1>
                        </Link>
                        <p>{ocean.about}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OceansPage;