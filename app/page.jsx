'use client'
import { useEffect } from 'react';

const  Home = () => {
  //const router = useRouter();
  useEffect(() => {
    // set / = /tour
    window.location.href = '/tourguest';
  }, []); 

  return (
    <>
    </>
  );
};

export default Home;

