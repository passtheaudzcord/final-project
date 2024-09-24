import OceanCard from "./OceanCard";

function OceanContainer({ oceans }) {
    return (
        <section>
            <ul className='cards'>
                {oceans.map(ocean => (
                    <OceanCard 
                        key={ocean.id} 
                        ocean={ocean}  
                    />
                ))}
            </ul>
        </section>
    );
}

export default OceanContainer;