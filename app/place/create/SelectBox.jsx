'use client'
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Cookies from "js-cookie";

export default function MultiSelect({setFormFoods}) {

    const fetchData = async () => {
        try {
            const token = Cookies.get('accessToken'); // Lấy token từ cookie

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const response = await fetch("https://95bc-58-187-74-177.ngrok-free.app/food", {
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

            setFoods(transformedLocations);

            //return transformedLocations
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const [foods, setFoods] = useState([]);

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
                name="foods"
                options={foods}
                className="lg:w-1/2 w-full"
                classNamePrefix="select"
                // onChange={(foods) => {
                //     setFormFoods(foods.map((food) => food.value))
                // }}
            />
        </div>
    );
}