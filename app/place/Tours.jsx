import React from 'react';
import Section from './Section'

function Tours(props) {

    //demo
    //const demo = [{title: 'Ho Tay', desc: 'xyz', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/H%E1%BB%93_T%C3%A2y_ho%C3%A0ng_h%C3%B4n_-_NKS.jpg'}, {title: 'Ho Guom', desc: 'xyz', url: 'https://static.vinwonders.com/production/ho-hoan-kiem-2.jpg'}, {title: 'Lang Bac', desc: 'xyz', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/L%C4%83ng_B%C3%A1c_-_NKS.jpg/1200px-L%C4%83ng_B%C3%A1c_-_NKS.jpg'}, {title: 'Van Mieu', desc: 'xyz', url: 'https://static.vinwonders.com/production/van-mieu-quoc-tu-giam-1.jpg'}, {title: 'Hoang Thanh Thang Long', desc: 'xyz', url: 'https://ik.imagekit.io/tvlk/blog/2022/03/hoang-thanh-thang-long-1.jpg'}, {title: 'Bao Tang Ha Noi', desc: 'xyz', url: 'https://static.vinwonders.com/production/bao-tang-ha-noi-01.jpg'}]
    
    const filterName = props.searchName

    const filteredPlaces = props.places.filter(place => {
        //const allLocation = await fetchDataLocation(tour.id);
        const nameMatch = place.name.toLowerCase().includes(filterName.toLowerCase());       
        // Return true if condition is true
        return nameMatch ;
    });
    
    return (
        <div>
            {filteredPlaces.map((item, index) => (
                <Section key={index} title={item.name} desc={item.description} url={item.location} id={item.id}/>
            ))}
        </div>
    );
}

export default Tours;