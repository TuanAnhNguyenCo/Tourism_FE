import React from 'react';
import Section from './Section'

function Tours(props) {

    const foods = props.tours
    const filterName = props.searchName
    const filterPrice = props.searchPrice


    const filteredTours = foods.filter(food => {
        //const allLocation = await fetchDataLocation(tour.id);
        const nameMatch = food.name.toLowerCase().includes(filterName.toLowerCase());
        const priceMatch = filterPrice === '' || food.price === parseFloat(filterPrice);
        
        // Return true if both conditions are true
        return nameMatch && priceMatch ;
    });

    return (
        <div>
            {filteredTours.map((item, index) => (
                <Section key={index} title={item.name} desc={item.description} url={item.url} id={item.id} />
            ))}
        </div>
    );
}

export default Tours;