import { React, useState, useEffect } from 'react';
import Section from './Section'
import Cookies from 'js-cookie';


function Tours(props) {

    const filterText = props.searchName

    useEffect(() => {
        //fetchDataLocation(2);
    }, [])

    // const fetchDataForMultipleLocations = async () => {
    //     tours.forEach(async (tour) => {
    //         await fetchDataLocation(tour.id);
    //     });
    // };

    // fetchDataForMultipleLocations()


    const filteredTours = props.tours.filter(tour => {
        //const allLocation = await fetchDataLocation(tour.id);
        const nameMatch = tour.name.toLowerCase().includes(filterText.toLowerCase());
        // Return true if both conditions are true
        return nameMatch 
    });



    return (
        <div>
            {filteredTours.map((item, index) => (
                <Section key={index} title={item.name} desc={item.description} url={item.url} id={item.id} price={item.price} />
            ))}
        </div>
    );
}

export default Tours;