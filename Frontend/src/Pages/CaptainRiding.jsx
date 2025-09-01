import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRidePop from '../Components/FinishRidePop'

const CaptainRiding = () => {

    const [upper, setupper] = useState(false)
    const location = useLocation();
    const ridedata = location.state?.ride;

    const upperref = useRef(null)

    useGSAP(() => {

    if (upper) {

      gsap.to(upperref.current, {
         transform: 'translateY(0%)',
        duration: 0.5,
      })
    
    } else {
      gsap.to(upperref.current, {
         transform: 'translateY(100%)',
        duration: 0.5,
      })
     
    }

  }, [upper]);
  return (
    <>
    <div className='h-screen'>

        <div className='fixed flex items-center justify-between w-screen  px-3'>
          <img className='w-20' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="" />
          <Link to="/captain-login" className=' text-xl bg-white rounded-full flex items-center justify-center w-8  h-8 font-lg'>
            <i className="ri-logout-box-line"></i>
          </Link>
        </div>

        <img className='h-4/5 w-full object-cover' src="https://cdn.dribbble.com/userupload/22910073/file/original-f308c35778d329518ef2b88f866111ec.gif" alt="error" />
        <div onClick={() => {
                    setupper(true)
                }} className='h-1/5 p-6 flex items-center justify-between bg-yellow-300 relative'>
               <h2 className='text-center w-[92%] top-0 font-bold  absolute'><i className=" text-2xl ri-arrow-up-wide-line"></i></h2>
                
                <h4 className='text-xl font-semibold'>4 KM away</h4>
                <button className='  bg-green-600  font-bold text-medium text-white px-8 py-2 rounded-lg '>Complete ride</button>
        </div>
         <div  ref={upperref} className='fixed bottom-0 z-10 translate-y-full bg-white w-full h-[80%] px-3'>
               <FinishRidePop  setupper={setupper} ridedata={ridedata}/>
        </div>
      </div>
    </>
  )
}

export default CaptainRiding