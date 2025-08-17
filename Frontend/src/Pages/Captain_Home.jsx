import React from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'

const Captain_Home = () => {
  return (
    <>
      <div className='h-screen'>

        <div className='fixed flex items-center justify-between w-screen  px-3'>
          <img className='w-20' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="" />
          <Link to="/captain-login" className=' text-xl bg-white rounded-full flex items-center justify-center w-8  h-8 font-lg'>
            <i className="ri-logout-box-line"></i>
          </Link>

        </div>
        <img className='h-3/5 w-screen object-cover' src="https://cdn.dribbble.com/userupload/22910073/file/original-f308c35778d329518ef2b88f866111ec.gif" alt="error" />

        <div className='h-2/5 p-6'>
         <CaptainDetails/>
        </div>

        <div className='fixed bottom-0 z-10  bg-white w-full h-[70%] px-3'>
                <RidePopUp/>
        </div>
      </div>
    </>
  )
}

export default Captain_Home