"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { UserContext } from "./UserContext";

export const ChatContext = createContext();

let socket;

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io("http://localhost:3001"); // Adjust with your server URL
    socket.on("user-chat", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("user-chat");
    };
  }, []);

  const { user } = useContext(UserContext);

  const sendMessage = (message) => {
    if (message) {
      socket.emit("message", message);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
