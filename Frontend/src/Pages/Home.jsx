import React from 'react'
import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from './LocationSearchPanel'

const Home = () => {


  const [pick, setpick] = useState('')
  const [destination, setDestination] = useState('');
  const [panel, setpanel] = useState(false)

  const Panelref = useRef(null);     // Reference for the panel element
  const Closeref = useRef(null)      // Reference for the close icon element


  const handleSearch = (e) => {
    e.preventDefault();

    setpick('');
    setDestination('');
  }

  useGSAP(() => {

    if (panel) {

      gsap.to(Panelref.current, {
        height: '70%',
        duration: 1,
        ease: 'power2.inOut',
        opacity: 1,
      })
      gsap.to(Closeref.current, {
        opacity: 1,
        
      })
    } else {
      gsap.to(Panelref.current, {
        height: '0%',
        duration: 1,
        ease: 'power2.inOut',
        opacity: 0,
      })
      gsap.to(Closeref.current, {
        opacity: 0,
       
      })
    }

  }, [panel])

  return (
    <>
      <div className=' relative'>
        <img className='w-20 absolute' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="error" />

        <div className=''>
          <img className='h-screen w-screen object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="error" />
        </div>

        <div className='flex flex-col justify-end absolute w-full h-screen top-0'>

          <div className='h-[30%] p-6 bg-white relative'>

            <h1 onClick={() => {
              setpanel(false);

            }} ref={Closeref} className='text-2xl absolute top-6 opacity-0 right-6 font-bold '>

              <i className="ri-arrow-down-wide-line"></i>
            </h1>
            <h4 className='text-2xl font-semibold'>Find a trip</h4>

            <form onSubmit={handleSearch}>
              <div className="line border-l-4 top-[45%] left-10 bg-gray-900 rounded-full h-16 absolute "></div>
              <input className='bg-[#dedede] w-full px-12 text-base mt-5 py-2 rounded outline-none' type="text" placeholder='Add a pick-up location' value={pick}
                onChange={
                  (e) => setpick(e.target.value)
                }

                onClick={() =>
                  setpanel(true)}
              />
              <input className='bg-[#dedede] w-full px-12 text-base mt-3 py-2 rounded outline-none' type="text" placeholder='Enter your destination' value={destination}
                onChange={(e) => {
                  setDestination(e.target.value)
                }} />
            </form>

          </div>

          <div ref={Panelref} className='bg-white '>
                    <LocationSearchPanel/>
          </div>
        </div>

         <div>
            
         </div>
      </div>
    </>
  )
}

export default Home