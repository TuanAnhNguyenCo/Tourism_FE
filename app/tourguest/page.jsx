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

    const [tours, setTours] = useState([]);
    const [text, setText] = useState('')


    const token = Cookies.get("accessToken");

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

            setTours(jsonData)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(tours)

    return (
        <>
            <Navbar />
            <Banner setText={setText} />

            <div id="main" className="flex items-center justify-center">
                <div id="right" className="w-4/5">
                    <Tours tours={tours} searchName={text} />
                </div>
            </div>
            <Footer />
        </>
    );
}
