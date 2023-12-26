"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const Detail = ({ id }) => {
  const fetchDataLocation = async () => {
    try {
      const token = Cookies.get("accessToken"); // Lấy token từ cookie

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`http://localhost:8080/location/${id}`, {
        method: "GET",
        headers,
      });
      const jsonData = await response.json();
      console.log(jsonData);
      //console.log(transformedLocations)
      setLocation(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [location, setLocation] = useState([]);
  const [foods, setFoods] = useState([]);

  const fetchDataFood = async () => {
    try {
      const token = Cookies.get("accessToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(
        `http://localhost:8080/food/foodInLocation/${id}`,
        {
          method: "GET",
          headers,
        }
      );
      const jsonData = await response.json();
      console.log(jsonData);
      //console.log(transformedLocations)
      setFoods(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    //fetchDataTour()
    fetchDataFood();
    fetchDataLocation();
  }, []);

  const [showMore, setShowMore] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://upload.wikimedia.org/wikipedia/commons/4/4a/H%E1%BB%93_T%C3%A2y_ho%C3%A0ng_h%C3%B4n_-_NKS.jpg",
    "https://static.vinwonders.com/production/ho-hoan-kiem-2.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/L%C4%83ng_B%C3%A1c_-_NKS.jpg/1200px-L%C4%83ng_B%C3%A1c_-_NKS.jpg",
    "https://static.vinwonders.com/production/van-mieu-quoc-tu-giam-1.jpg",
    "https://ik.imagekit.io/tvlk/blog/2022/03/hoang-thanh-thang-long-1.jpg",
    "https://static.vinwonders.com/production/bao-tang-ha-noi-01.jpg",
  ];

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const tourInfo = {
    fee: "5000¥",
    numberOfPeople: 10,
    time: "2日",
    location: "ハノイ",
    status: "利用可能",
  };

  const comments = [
    {
      user: "フェイカー",
      comment: "美しい景色",
      time: "2023-11-22 12:30:00",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/1/1a/Faker_2020_interview.jpg",
    },
    {
      user: "クリスティアーノ・ロナウド",
      comment: "素晴らしい",
      time: "2023-11-22 13:45:00",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/6/64/Cristiano_Ronaldo_2018_%28cropped%29.jpg",
    },
    {
      user: "ライオネル・メッシ",
      comment: "GOAT!!!",
      time: "2023-11-22 14:20:00",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/b/b8/Messi_vs_Nigeria_2018.jpg",
    },
  ];

  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <form className="max-w-2xl mx-auto mt-4">
      <div className="space-y-4">
        <div className="border border-gray-300 p-4 rounded-md mx-auto float-center mt-4">
          <label
            htmlFor="tour-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            <b className="text-lg">{location.name}</b>
          </label>
          <div className="image-section relative overflow-x-auto">
            <button
              type="button"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded-full"
              onClick={handlePrevImage}
            >
              &lt;
            </button>
            <button
              type="button"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-2 py-1 rounded-full"
              onClick={handleNextImage}
            >
              &gt;
            </button>
            <div className="flex">
              <img
                src={location.location}
                //alt={`Tour Image ${currentIndex + 1}`}
                className="mr-2"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-300 p-4 rounded-md mx-auto center mt-6">
          <label
            htmlFor="tour-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            <b className="text-lg">情報</b>
          </label>
          <br />
          <div className="tour-info-section">
            <ul>
              <li>
                <b className="mr-10">観光地</b> {location.name}
              </li>
              {/* <li>
                <b className="mr-5">Location</b> {location.location}
              </li> */}
              <li>
                <b className="mr-9">レーティング</b> {location.rating}
              </li>
            </ul>
            <ul>
              <b>お勧めのフード</b>
              {foods.map((food) => (
                <Link
                  className="text-blue-500 hover:text-blue-300"
                  key={food.id}
                  href={`/food/detail/${food.id}`}
                >
                  <li>{food.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <div className="border border-gray-300 p-4 rounded-md mx-auto center mt-6">
          <label
            htmlFor="tour-schedule"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            <b className="text-lg">デスクリプション</b>
          </label>
          <br />
          <div className="tour-schedule-section">
            <p>{location.description}</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Detail;
