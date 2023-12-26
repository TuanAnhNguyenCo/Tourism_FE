import React from 'react'
import Footer from '@/app/components/Footer'
import Navbar from './Navbar'
import UserDetail from './UserDetail'
import CardDetail from './CardDetail'
import Button from './Button'

const payment
 = () => {
  return (
    <>
        <Navbar />
        <div className='flex'>

        <UserDetail />
        <CardDetail />
        </div>
        <Footer className='mt-11'/>
    </>
  )
}

export default payment
