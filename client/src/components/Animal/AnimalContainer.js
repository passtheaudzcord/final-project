import AnimalCard from "./AnimalCard";

function AnimalContainer({ animals }) {
    return (
        <section>
            <ul className='cards'>
                {animals.map(animal => (
                    <AnimalCard 
                        key={animal.id} 
                        animal={animal} 
                    />
                ))}
            </ul>
        </section>
    );
}

export default AnimalContainer;