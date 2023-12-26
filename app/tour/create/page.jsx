'use client';
import React, { useState } from 'react';
import Navbar from '../Navbar'
import CreateForm from './CreateForm'
import Cookies from 'js-cookie';
import Footer from '../../components/Footer';


const CreateTour = () => {



  const handleSubmitForm = (e, formValue) => {
    const token = Cookies.get('accessToken'); // Lấy token từ cookie
    e.preventDefault();
    console.log("Submit form", formValue)
    // after call api
    fetch('http://localhost:8080/tour', {
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
        
        window.location.href = '/tour'
        // Handle the response data as needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors
      });
    // redirect here 
  }

  return (
    <>
      <Navbar />
      <CreateForm submitForm={handleSubmitForm} />
      <Footer />
    </>
  )
}

export default CreateTour