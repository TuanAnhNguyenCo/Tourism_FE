'use client';

import React, { useState } from 'react';
import Navbar from '../../Navbar';
import EditForm from './EditForm';
import Cookies from 'js-cookie';
import Footer from '../../../components/Footer';

const TourEdit = () => {
  //const token = Cookies.get('accessToken');

  const handleSubmitForm = (e, formValue,id) => {
    const token = Cookies.get('accessToken');
    e.preventDefault();
    console.log("Submit form", formValue)
    // after call api

    fetch(`http://localhost:8080/food/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        // Add any additional headers if needed
      },
      body: JSON.stringify(formValue),
    })
      .then(response => response.json())
      .then(data => {

        window.location.href = '/food'
        // Handle the response data as needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors
      });

    // redirect here 
  }

  const deleteItem = (e,formValue,id) => {
    fetch(`http://localhost:8080/food/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        //Authorization: `Bearer ${token}`,
        // Add any additional headers if needed
      },
      // You can include a request body if necessary
    })
      .then(response => {
        if (response.ok) {
          window.location.href = '/food'
          // Handle the success scenario
        } 
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors
      });
  }


  return (
    <>
      <Navbar />
      <EditForm submitForm={handleSubmitForm} deleteItem={deleteItem}/>
      <Footer />
    </>
  )
}

export default TourEdit