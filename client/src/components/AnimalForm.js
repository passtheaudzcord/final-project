import React, { useState } from "react";

//1. form state
//2. have input values reflect state
//3. onchange

function AnimalForm({ addAnimal }) {

  const [form, setForm] = useState({
    name: '',
    scientific_name: '',
    lifespan: '',
    about: '',
    fun_fact: '',
    food: '',
    img: '',
    likes: 0
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //POST
    fetch('http://localhost:5555/animals', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(form)
    })
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        throw Error('post went wrong')
      }
    })
    //on successful POST we will invoke addToy
    .then(data => {
      addAnimal(data)
      setForm({
        favorite: 0,
        img: '',
        food: '',
        fun_fact: '',
        about: '',
        lifespan: '',
        scientific_name: '',
        name: '',
      })
    })
    .catch(err => console.error('couldnt reach server'))
  }

	return (
		<div className="container">
			<form className="add-animal-form" onSubmit={e => handleSubmit(e)}>
				<h3>Add an endemic animal!</h3>
				<input
					type="text"
					name="name"
					placeholder="Enter animal's common name..."
					className="input-text"
          value={form.name}
          onChange={e => handleChange(e)}
				/>
				<br />
				<input
					type="text"
					name="scientific_name"
					placeholder="Enter animal scientific name"
					className="input-text"
          value={form.scientific_name}
          onChange={e => handleChange(e)}
				/>
				<br />
                <input
					type="text"
					name="lifespan"
					placeholder="Enter animal's lifespan"
					className="input-text"
          value={form.lifespan}
          onChange={e => handleChange(e)}
				/>
                <input
					type="text"
					name="about"
					placeholder="Enter information about the animal."
					className="input-text"
          value={form.about}
          onChange={e => handleChange(e)}
				/>
				<br />
                <input
					type="text"
					name="fun_fact"
					placeholder="Enter a fun fact!"
					className="input-text"
          value={form.fun_fact}
          onChange={e => handleChange(e)}
				/>
				<br />
                <input
					type="text"
					name="food"
					placeholder="Enter animal's food"
					className="input-text"
          value={form.food}
          onChange={e => handleChange(e)}
				/>
				<br />
                <input
					type="text"
					name="img"
					placeholder="Enter image url"
					className="input-text"
          value={form.img}
          onChange={e => handleChange(e)}
				/>
				<br />
				<button 
                    type="submit"
                    name="submit"
                    className="submit"
                >
    Add a new animal
</button>
			</form>
		</div>
	);
}

export default AnimalForm;