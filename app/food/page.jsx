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
import ChatButton from "../components/ChatButton";
import ChatComponent from "../components/ChatBox";

export default function Home() {
  const [tours, setTours] = useState([]);
  const [role, setRole] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

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

  const fetchData = async () => {
    try {
      const token = Cookies.get("accessToken"); // Lấy token từ cookie

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch("http://localhost:8080/food", {
        method: "GET",
        headers,
      });

      const jsonData = await response.json();
      console.log(jsonData);
      if (jsonData == null) {
        setTours([]);
      }
      setTours(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserRole();
  }, []);

  return (
    <>
      <Navbar />
      <Banner setName={setName}/>

      {role === "ADMIN" && 
      <Link href="/food/create">
        <Button />
      </Link>
      }

      <div id="main" className="flex">
        <div id="left" className="w-1/5">
          <PriceInput setPrice={setPrice}/>
          {/* <OptionBox /> */}
        </div>
        <div id="right" className="w-4/5">
          <Tours tours={tours} searchName={name} searchPrice={price}/>
        </div>
      </div>
      <Footer />
    </>
  );
}
