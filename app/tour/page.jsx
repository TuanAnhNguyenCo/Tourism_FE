"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import OptionBox from "./OptionBox";
import PriceInput from "./PriceInput";
import Tours from "./Tours";
import Button from "./Button";
import Link from "next/link";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import ChatComponent from "../components/ChatBox";
import ChatButton from "../components/ChatButton";

export default function Home() {
  const [allTours, setAllTours] = useState([]);
  const [tours, setTours] = useState([]);
  const [role, setRole] = useState([]);
  const [text, setText] = useState('');
  const [price, setPrice] = useState('');
  const [haveLocation, setHaveLocation] = useState([]);

  const fetchUserRole = async () => {
    try {
      const token = Cookies.get("accessToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`http://localhost:8080/user/role`, {
        method: "GET",
        headers,
      });
      const jsonData = await response.json();
      console.log(jsonData);

      setRole(jsonData)
      // if(jsonData=="ADMIN"){
      // }
      //console.log(transformedLocations)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const getTourLocations = (tours) => {
    const tourPromises = tours.map(tour => {
      return fetchDataLocation(tour.id)
    })
    let newAllTours = [...tours]

    Promise.all(Object.values(tourPromises)).then((values) => {
      const tourAfterPromises = values.reduce((acc, obj) => {
        const key = Object.keys(obj)[0];
        const value = obj[key];
        acc[key] = value;
        return acc;
      }, {});

      let newAllTours = [...tours]

      newAllTours.forEach((tour) => {
        tour.locations = tourAfterPromises[tour.id].map(t => t.name)
      });
    });

    return newAllTours
  }

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
      return {
        [id]: jsonData
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const token = Cookies.get("accessToken"); // Lấy token từ cookie

      const headers = {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      };

      const response = await fetch("http://localhost:8080/tour", {
        method: "GET",
        headers,
      });

      const jsonData = await response.json();
      // console.log(jsonData);
      if (jsonData == null) {
        setAllTours([]);
      }

      const tours = getTourLocations(jsonData)
      console.log(tours)
      setAllTours(tours)
      setTours(tours)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterByName = (tours) => {
    if (text) {
      return tours.filter(tour => tour.name.toLowerCase().includes(text.toLowerCase()))
    } else {
      return tours
    }
  }

  const filterByPrice = (tours) => {
    if (price) {
      return tours.filter(tour => tour.price === parseFloat(price))
    } else {
      return tours
    }
  }


  const filterByLocations = (tours) => {
    if (haveLocation.length > 0) {
      return tours.filter(tour => {
        const subtractedArray = haveLocation.filter(location => tour.locations.includes(location));
        return subtractedArray.length == haveLocation.length
      })
    } else {
      return tours
    }
  }

  useEffect(() => {
    fetchData();
    fetchUserRole();
  }, []);

  useEffect(() => {
    let toursFiltered = [...allTours]
    toursFiltered = filterByName(toursFiltered)
    toursFiltered = filterByPrice(toursFiltered)
    toursFiltered = filterByLocations(toursFiltered)

    setTours(toursFiltered)
  }, [text, price, haveLocation]);

  return (
    <>
      <Navbar />
      <Banner setText={setText} />

      {role === "ADMIN" &&
        <Link href="/tour/create">
          <Button />
        </Link>
      }

      <div id="main" className="flex">
        <div id="left" className="w-1/5">
          <PriceInput setPrice={setPrice} />
          <OptionBox setHaveLocation={setHaveLocation} />
        </div>
        <div id="right" className="w-4/5">
          <Tours tours={tours} />
        </div>
      </div>
      <Footer />
    </>
  );
}
