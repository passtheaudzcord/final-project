import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Function to fetch oceans from an API
const fetchOceans = async () => {
    const response = await fetch('http://localhost:5555/oceans');
    if (!response.ok) {
        throw new Error('Failed to fetch oceans');
    }
    return response.json(); // Make sure to return the parsed JSON
};

function EditAnimal() {
    const { id } = useParams(); // Get the animal ID from the URL
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        scientific_name: '',
        lifespan: '',
        about: '',
        fun_fact: '',
        food: '',
        img: '',
        ocean: '' // This will hold the ocean ID
    });
    const [oceans, setOceans] = useState([]);

    // Fetch oceans on component mount
    useEffect(() => {
        const loadOceans = async () => {
            try {
                const oceanData = await fetchOceans();
                setOceans(oceanData);
            } catch (error) {
                console.error('Error fetching oceans:', error);
            }
        };

        loadOceans();
    }, []);

    // Fetch animal details on component mount
    useEffect(() => {
        fetch(`http://localhost:5555/animals/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Animal not found');
                return res.json();
            })
            .then(data => {
                setForm(data); // Populate form with existing animal data
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5555/animals/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
        .then((res) => {
            if (!res.ok) {
                return res.text().then(text => {
                    throw new Error(`Update failed: ${text}`);
                });
            }
            return res.json();
        })
        .then(() => {
            navigate('/home'); // Navigate to /home after submission
        })
        .catch(err => console.error('Couldn\'t reach server', err));
    };

    return (
        <div className="container">
            <form className="edit-animal-form" onSubmit={handleSubmit}>
                <h3>Edit Animal Details</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter animal's common name..."
                    className="input-text"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="text"
                    name="scientific_name"
                    placeholder="Enter animal scientific name"
                    className="input-text"
                    value={form.scientific_name}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="text"
                    name="lifespan"
                    placeholder="Enter animal's lifespan"
                    className="input-text"
                    value={form.lifespan}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="about"
                    placeholder="Enter information about the animal."
                    className="input-text"
                    value={form.about}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="text"
                    name="fun_fact"
                    placeholder="Enter a fun fact!"
                    className="input-text"
                    value={form.fun_fact}
                    onChange={handleChange}
                />
                <br />
                <input
                    type="text"
                    name="food"
                    placeholder="Enter animal's food"
                    className="input-text"
                    value={form.food}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="text"
                    name="img"
                    placeholder="Enter image url"
                    className="input-text"
                    value={form.img}
                    onChange={handleChange}
                />
                <br />
                <select name="ocean" value={form.ocean} onChange={handleChange} required>
                    <option value="">Select Ocean</option>
                    {oceans.map(ocean => (
                        <option key={ocean.id} value={ocean.id}>
                            {ocean.name}
                        </option>
                    ))}
                </select>
                <br />
                <button type="submit" className="submit">
                    Update Animal
                </button>
            </form>
        </div>
    );
}

export default EditAnimal;