import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    const [oceans, setOceans] = useState([])
    const [animals, setAnimals] = useState([])

    useEffect(() => {
		// this is how we communicate with flask
		// by making fetch requests
		fetch("http://127.0.0.1:5555/oceans")
		.then(res => {
			if(res.ok) {
				return res.json()
			} else {
				console.error("fetch http://127.0.0.1:5555/oceans went wrong")
			}
		})
		.then(data => setOceans(data))
	}, []) // don't forget the empty dependency array

    useEffect(() => {
		// this is how we communicate with flask
		// by making fetch requests
		fetch("http://127.0.0.1:5555/animals")
		.then(res => {
			if(res.ok) {
				return res.json()
			} else {
				console.error("fetch http://127.0.0.1:5555/animals went wrong")
			}
		})
		.then(data => setAnimals(data))
	}, []) // don't forget the empty dependency array


    return(
        <div className="home">
            <div className="oceans">
            {oceans.map((ocean) => (
                <div className="ocean" key={ocean.id}>
                    <div className="oceanimg">
                        <img src={ocean.id} alt="" />
                    </div>
                    <div className="ocean-content">
                        <Link className="ocean-link" to={`/ocean/${ocean.id}`}>
                        <h1>{ocean.name}</h1>
                        </Link>
                        <button>Learn more</button>
                    </div>
                </div>
            ))}
            </div>
            <div className="animals">
            {animals.map((animal) => (
                <div className="animal" key={animal.id}>
                    <div className="animalimg">
                        <img src={animal.id} alt="" />
                    </div>
                    <div className="animal-content">
                        <Link className="animal-link" to={`/animal/${animal.id}`}>
                        <h1>{animal.name}</h1>
                        </Link>
                        <button>Learn more</button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}


export default Home;