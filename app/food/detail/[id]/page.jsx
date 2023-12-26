"use client";
import { useState, useEffect } from "react";
import React from "react";
import Navbar from "../../Navbar";
import Detail from "./Detail";
import EditButton from "./EditButton"
import Link from 'next/link';
import Cookies from "js-cookie";
import Footer from '../../../components/Footer';

const TourDetail = ({ params }) => {

  const [role, setRole] = useState([]);

  useEffect(() => {
    fetchUserRole()
  }, []);

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

  return (
    <>
      <Navbar />
      <Detail id={params.id} />
      {role === "ADMIN" && 
        <Link href={`/food/edit/${params.id}`}>
          <EditButton />
        </Link>
       
      }
      
      <Footer />
    </>
  );
};

export default TourDetail;
