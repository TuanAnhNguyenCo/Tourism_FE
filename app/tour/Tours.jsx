import { React, useState, useEffect } from 'react';
import Section from './Section'
import Cookies from 'js-cookie';



function Tours({ tours }) {

    const [locations, setLocations] = useState([]);



    const fetchDataLocation = async (id) => {
        try {
            const token = Cookies.get("accessToken");
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const response = await fetch(
                `http://localhost:8080/locationsOnTour/${id}`,
                {
                    method: "GET",
                    headers,
                }
            );
            const jsonData = await response.json();
            //console.log("response")
            setLocations(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        //fetchDataLocation(2);
    }, [])

    // const fetchDataForMultipleLocations = async () => {
    //     tours.forEach(async (tour) => {
    //         await fetchDataLocation(tour.id);
    //     });
    // };

    // fetchDataForMultipleLocations()


    // const filteredTours = tours.filter(tour => {
    //     //const allLocation = await fetchDataLocation(tour.id);
    //     const nameMatch = tour.name.toLowerCase().includes(filterText.toLowerCase());
    //     const priceMatch = filterPrice === '' || tour.price === parseFloat(filterPrice);
    //     const locationMatch = filterLocation === filterLocation.length==0 || filterLocation.every(item=>location.includes(item))
        
    //     // Return true if both conditions are true
    //     return nameMatch && priceMatch && locationMatch;
    // });



    return (
        <div>
            {tours.map((item, index) => (
                <Section key={index} title={item.name} desc={item.description} url={item.url} id={item.id} price={item.price} />
            ))}
        </div>
    );
}

export default Tours;