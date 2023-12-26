"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import Rating from "./Rating"

const Detail = ({ id }) => {
  const [registered, setRegistered] = useState(false);
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')

  // comment api

  const fetchDataComment = async () => {
    try {
      const token = Cookies.get("accessToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`http://localhost:8080/tour/comment/${id}`, {
        method: "GET",
        headers,
      });
      const jsonData = await response.json();
      setComments(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmitForm = (e) => {
    const token = Cookies.get('accessToken'); // Lấy token từ cookie
    e.preventDefault();
    //console.log("Submit form", formValue)
    // after call api

    let formValue = {
      'content': content,
      'tourId': id
    }

    fetch('http://localhost:8080/tour/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        // Add any additional headers if needed
      },
      body: JSON.stringify(formValue),
    })
      .then(response => response.json())
      .then(data => {
        fetchDataComment();
        setContent('');
        //window.location.href = `/tour/detail/${id}`
        // Handle the response data as needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors
      });
    // redirect here 
  }

  // 

  const fetchDataTour = async () => {
    try {
      const token = Cookies.get("accessToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`http://localhost:8080/tour/${id}`, {
        method: "GET",
        headers,
      });
      const jsonData = await response.json();
      setTour(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const peopleOnTour = async () => {
    try {
      const token = Cookies.get("accessToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`http://localhost:8080/tour/people/${id}`, {
        method: "GET",
        headers,
      });
      const jsonData = await response.json();
      setPeople(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [tour, setTour] = useState([]);
  const [people, setPeople] = useState([]);

  const fetchContractState = async () => {
    const token = Cookies.get("accessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`http://localhost:8080/tour/book/${id}`, {
      method: "GET",
      headers,
    });
    const jsonData = await response.json();
    setRegistered(jsonData);
  };

  const fetchDataLocation = async () => {
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
      setLocations(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const contract = async (e) => {
    const token = Cookies.get("accessToken"); // Lấy token từ cookie
    e.preventDefault();
    fetch("http://localhost:8080/contract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // Add any additional headers if needed
      },
      body: JSON.stringify({
        tourId: `${id}`,
      }),
    }).then(() => {
      if (localStorage.getItem("a") !== null) {
        localStorage.setItem("a", `${localStorage.getItem("a")},${id}`);
      } else {
        localStorage.setItem("a", id);
      }
      setRegistered(true);
      peopleOnTour();
    });

    // redirect here
  };

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchDataTour();
    fetchDataLocation();
    peopleOnTour();
    fetchContractState();
    fetchDataComment();
  }, []);

  // useEffect(() => {
  //   peopleOnTour()
  // }, [isRegistered])

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

  const comments1 = [
    {
      user: "オナナー",
      comment: "なんて思い出深い経験でしょう",
      time: "2023-11-22 12:30:00",
      avatar:
        "https://vcdn-thethao.vnecdn.net/2023/11/18/erik-ten-hag-onana-man-utd-vs-7433-9610-1700290010.jpg",
    },
    {
      user: "クリスティアーノ・ロナウド",
      comment: "41歳は人生の頂点",
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
    {
      user: "コング・フーオング",
      comment: "必ずまたこのツアーに参加します",
      time: "2023-11-22 12:30:00",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmO16SRb6-hY02fQRBKSMva-gGk4VkukMIAM8yAlLCJw&s",
    },
    {
      user: "バン・サン",
      comment: "このツアーは素晴らしいです",
      time: "2023-11-22 12:30:00",
      avatar:
        "https://vcdn-vnexpress.vnecdn.net/2021/10/14/vu-van-thanh-mobile-1851-1634204197.jpg",
    },
    {
      user: "バン・トーン",
      comment: "素晴らしい",
      time: "2023-11-22 12:30:00",
      avatar:
        "data:image/jpeg;base64,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",
    },
    {
      user: "エム・ピー・スリー",
      comment: "一ペニーの価値がある",
      time: "2023-11-22 12:30:00",
      avatar: "https://cdn.bongdaplus.vn/Assets/Media/2021/12/17/26/Mbappe.jpg",
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
            <b className="text-lg">{tour.name}</b>
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
                src={images[currentIndex]}
                alt={`Tour Image ${currentIndex + 1}`}
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
              <li className="mb-2">
                <b className="mr-48">料金</b> {tour.price}万
              </li>
              <li className="mb-2">
                <b className="mr-48">人数</b> {tour.max_capacity <= 0 ? tour.max_capacity : <span className="text-gray-400">"末登録"</span>}
              </li>
              <li className="mb-2">
                <b className="mr-48">時間</b> {tour.due !== null ? tour.due : <span className="text-gray-400">"末登録"</span>}
              </li>
              {/* <li className='mb-2'>
                <b className='mr-48'>場所</b> {tourInfo.location}
              </li> */}
              <li className="mb-2">
                <b className="mr-48">状態</b> {tour.status !== null ? tour.status : <span className="text-gray-400">"末登録"</span>}
              </li>
              <li className="mb-2">
                <ul>
                  <b>場所</b>
                  {locations.map((location) => (
                    <Link
                      className="text-blue-500"
                      key={location.id}
                      href={`/place/detail//${location.id}`}
                    >
                      <li className="ml-56 mb-1">{location.name}</li>
                    </Link>
                  ))}
                </ul>
              </li>
              <li className="mb-2">
                <b className="mr-32">注文する人数</b> {people}
              </li>
            </ul>
            <div className="flex items-center justify-center p-2 rounded-md mt-4">
              {registered ? (
                <div className="p-2 bg-orange-400 text-white rounded-md shadow-md inline-block mt-2 border border-gray-300">
                  予約した
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    contract(e);
                  }}
                >
                  <div className="p-2 text-white bg-blue-500 hover:bg-blue-400 transition rounded-md shadow-md inline-block mt-2 border border-gray-300">
                    <b>予約</b>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="border border-gray-300 p-4 rounded-md mx-auto center mt-6">
          <label
            htmlFor="tour-schedule"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            <b className="text-lg">詳しいスケジュール</b>
          </label>
          <br />
          <div className="tour-schedule-section">
            <p>{tour.description}</p>
            {/* <p>
              [2]
              ユニークなハノイ料理を提供する人気レストランでランチをお楽しみください。
            </p>
            <p>
              [3]
              引き続きハノイ博物館を訪問して、街の歴史と文化をより深く理解してください。
            </p>
            <p>
              [4]
              旅の終わりは、あらゆる年齢層の観光客が楽しめるゲームやエンターテイメントがたくさんあるヴィンワンダーズ
              ハノイで終わります。
            </p> */}
          </div>
        </div>

        {registered ? (
          <>
            <div className="border border-gray-300 p-4 rounded-md mx-auto center mt-6">
              <Rating />
            </div>
            <div className="border border-gray-300 p-4 rounded-md mx-auto center mt-6">
              <label
                htmlFor="tour-comments"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <b className="text-lg">コメント</b>
              </label>
              {/* map cmt */}
              <div className="tour-comments-section">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex items-start border-b border-gray-300 py-4"
                  >
                    {/* <div className="flex-shrink-0">
                  <img
                    src={comment.avatar}
                    alt={`Avatar ${comment.user}`}
                    className="w-12 h-12 rounded-full"
                  />
                </div> */}
                    <div className="ml-4">
                      <span className="font-bold text-sm ml-2">
                        @{comment.user}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">
                        {comment.createdAt}
                      </span>
                      <p className="text-gray-800 ml-2">{comment.content}</p>
                    </div>
                  </div>
                ))}

                <div className="my-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                    あなたのコメント:
                  </label>
                  <textarea
                    className="resize-none border rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    id="comment"
                    name="comment"
                    rows="4"
                    placeholder="コメントを入力してください..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                  ></textarea>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-blue-700"
                    onClick={handleSubmitForm}
                  >
                    提出する
                  </button>
                </div>

              </div>

              {/* end cmt  */}
            </div>
          </>
        ) : <><div className="border border-gray-300 p-4 rounded-md mx-auto center mt-6">
          <label
            htmlFor="tour-comments"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            <b className="text-lg">コメント</b>
          </label>
          {/* map cmt */}
          <div className="tour-comments-section">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="flex items-start border-b border-gray-300 py-4"
              >
                {/* <div className="flex-shrink-0">
            <img
              src={comment.avatar}
              alt={`Avatar ${comment.user}`}
              className="w-12 h-12 rounded-full"
            />
          </div> */}
                <div className="ml-4">
                  <span className="font-bold text-sm ml-2">
                    @{comment.user}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    {comment.createdAt}
                  </span>
                  <p className="text-gray-800 ml-2">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* end cmt  */}
        </div> </>}
      </div>
    </form>
  );
};

export default Detail;
