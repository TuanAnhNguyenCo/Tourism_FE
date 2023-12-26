"use client";
import { useState, useEffect } from "react";
import React from "react";
import Navbar from "../../Navbar";
import Detail from "./Detail";
import EditButton from "./EditButton";
import Link from "next/link";
import ChatButton from "@/app/components/ChatButton";
import ChatBoxComponent from "@/app/components/ChatBox";
import Cookies from "js-cookie";
import Footer from "@/app/components/Footer";

const TourDetail = ({ params }) => {
  const [showChat, setShowChat] = useState(false);
  const [chatMode, setChatMode] = useState(null);

  const handleChatWithAdmin = () => {
    setChatMode("admin");
    setShowChat(true);
  };

  const handleDiscussion = () => {
    setChatMode("discussion");
    setShowChat(true);
  };

  const handleToggleChat = () => {
    setShowChat(false);
  };

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
        <Link href={`/tour/edit/${params.id}`}>
          <EditButton />
        </Link>
       
      }
      <div>
        <ChatButton
          onChatWithAdmin={handleChatWithAdmin}
          onDiscussion={handleDiscussion}
          onToggleChat={handleToggleChat}
        />
        {showChat && <ChatBoxComponent chatMode={chatMode} />}
      </div>
      <Footer />
    </>
  );
};

export default TourDetail;
