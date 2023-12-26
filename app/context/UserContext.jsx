"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const token = Cookies.get("accessToken");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/user", {
          method: "GET",
          headers,
        });

        const jsonData = await response.json();
        if (jsonData == null) {
          setUser({});
        }
        setUser(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
