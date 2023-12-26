'use client'
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Cookies from "js-cookie";

export default function MultiSelect() {

    const fetchData = async () => {
        try {
            const token = Cookies.get('accessToken'); // Lấy token từ cookie

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const response = await fetch("https://95bc-58-187-74-177.ngrok-free.app/locations", {
                method: 'GET',
                headers,
            });
            const jsonData = await response.json();


            // Transform the data to fit react-select's expected format
            const transformedLocations = jsonData.map(({ id, name }) => ({
                value: id,
                label: name,
            }));
            //console.log(jsonData)
            console.log(transformedLocations)
            //console.log(transformedLocations)

            setLocations(transformedLocations);

            //return transformedLocations
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="container mx-auto  w-96">
            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">
                Location Select
            </label>
            <Select
                isMulti
                name="locations"
                options={locations}
                className="lg:w-1/2 w-full"
                classNamePrefix="select"
            />
        </div>
    );
}