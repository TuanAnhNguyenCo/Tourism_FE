'use client'
import { UserContext } from '@/app/context/UserContext'
import React, { useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const UserDetail = () => {

  const { user } = useContext(UserContext);

  //console.log(user)
  const fetchDataTour = async (item) => {
    try {
      const token = Cookies.get("accessToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const fetchedData = [];

      for (const i of item) {
        try {
          const response = await fetch(`http://localhost:8080/tour/${i}`, {
            method: "GET",
            headers,
          });
          const jsonData = await response.json();
          fetchedData.push(jsonData);
        } catch (error) {
          console.error("Error fetching data for item:", i, error);
        }
      }

      // After all requests are done, update the state once
      setTour([...tour, ...fetchedData]);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const calculateTotalPrice = () => {
    let totalPrice = 0;

    tour.forEach((t) => {
      totalPrice += t.price;
    });

    return totalPrice;
  };


  const [tour, setTour] = useState([]);
  const totalPrice = 0

  useEffect(() => {
    let item = localStorage.getItem('a')
    if (item === null) return

    item = item.split(',')
    // for(let i=0; i<item.length; i++){
    fetchDataTour(item)
    // }
  }, [])


  // const item = localStorage.getItem('a')

  // fetchDataTour(item)


  return (
    <>
      <div className='float-left w-1/3 ml-32 mt-8' >
        <p className='mb-6'>個人情報と連絡先情報を入力します</p>

        <div className="tour-info-section">
          <ul>
            <li className='mb-2'>
              <b className='mr-6'>料金</b> {user.name}
            </li>
            <li className='mb-2'>
              <b className='mr-6'>人数</b> {user.email}
            </li>

            <li className='mb-2'>
              <b className='mr-6'>時間</b> {user.phone}
            </li>



            {/* <li className='mb-2'>
                            <b className='mr-6'>ツアー名</b> {tour.name}
                        </li>
                        <li className='mb-2'>
                            <b className='mr-6'>料金 </b> {tour.price}
                        </li> */}
          </ul>

          <ul className='mt-6'>
            {tour.map((t, index) => (
              <li key={index}> <b>
                ツアー名: </b> {t.name} <br /> <b className='mr-4'>料金:</b>  {t.price}  <br /><br /> </li>
            ))}
            <li><b className='mr-6'>合計:</b> {calculateTotalPrice()}</li>
          </ul>

        </div>
      </div>

    </>
  )
}

export default UserDetail

