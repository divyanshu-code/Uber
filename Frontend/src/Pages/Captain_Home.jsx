import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConRidePopUp from '../Components/ConRidePopUp'
import { useContext } from 'react'
import { Socket } from '../Context/SocketContext'
import { CaptainDataContext } from '../Context/CaptainContext'

const Captain_Home = () => {

  const [ride, setride] = useState(false)
  const [confirm, setconfirm] = useState(false)

  const rideref = useRef(null)
  const confirmref = useRef(null)

  const { socket } = useContext(Socket);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {

    socket.emit('join', { userType: 'captain', userId: captain._id });


    //  this updates the captain's location and show its live position 

    const updatelocation = () => {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
           });
        });
      }
    };

    const locationInterval = setInterval(updatelocation, 10000);

     updatelocation();
    // return () => {
    //   clearInterval(locationInterval);
    // };

  }, [captain]);

  socket.on('new-ride', (message) => {

    console.log(message);
    
  });

  useGSAP(() => {

    if (ride) {

      gsap.to(rideref.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
      })

    } else {
      gsap.to(rideref.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      })

    }

  }, [ride]);

  useGSAP(() => {

    if (confirm) {

      gsap.to(confirmref.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
      })

    } else {
      gsap.to(confirmref.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      })

    }

  }, [confirm]);

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
          <CaptainDetails />
        </div>

        <div ref={rideref} className='fixed bottom-0 z-10 translate-y-full bg-white w-full h-[70%] px-3'>
          <RidePopUp setride={setride} setconfirm={setconfirm} />
        </div>

        <div ref={confirmref} className='fixed bottom-0 z-10 translate-y-full bg-white w-full h-screen px-3'>
          <ConRidePopUp  setride={setride} setconfirm={setconfirm}/>
        </div>


      </div>
    </>
  )
}

export default Captain_Home