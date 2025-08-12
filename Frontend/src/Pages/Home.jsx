import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className='bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]  h-screen  pt-5 flex justify-between flex-col w-full'>
        <img className='w-16 ml-5' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="error" />

        <div className='bg-white pb-5 px-4 py-4'>
          <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
          <Link to='/login' className='inline-block text-center w-full bg-black text-white py-3 rounded mt-4'>Continue</Link>

          {/* Link is inline element, so it will not take the full width of the parent div that is why we are using inline-block */}

        </div>

      </div>
    </>
  )
}

export default Home