import React from 'react'
import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from './LocationSearchPanel'
import VehiclePanel from '../Components/VehiclePanel'
import ConfirmRidePanel from '../Components/ConfirmRidePanel'
import LookingForDriver from '../Components/LookingForDriver'
import WaitingForDriver from '../Components/WaitingForDriver'
import axios from 'axios';

const Home = () => {

  const [pick, setpick] = useState('');
  const [destination, setDestination] = useState('');
  const [panel, setpanel] = useState(false);
  const [vehiclePanel, setvehiclePanel] = useState(false);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false);
  const [driver, setdriver] = useState(false);
  const [waitingfordriver, setwaitingfordriver] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState('');
  const [fare, setfare] = useState({})
  const [vehicleType, setvehicleType] = useState(null)

  const Panelref = useRef(null);                         // Reference for the panel element
  const Closeref = useRef(null)                         // Reference for the close icon element
  const vehiclePanelref = useRef(null);                 // Reference for the vehicle panel element
  const confirmRidePanelref = useRef(null)
  const driverref = useRef(null)
  const waitingfordriverref = useRef(null)

  const fetchSuggestions = async (text) => {
    if (!text) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: text },
          headers:
            { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

      setSuggestions(response.data || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error.message);
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    if (activeField === 'pickup') {
      setpick(suggestion);
    } else if (activeField === 'destination') {
      setDestination(suggestion);
    }
    // setpanel(false);
    setSuggestions([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    setpick('');
    setDestination('');
  }

  useGSAP(() => {

    if (panel) {

      gsap.to(Panelref.current, {
        height: '70%',
        duration: 0.5,
        ease: 'power2.inOut',
        opacity: 1,
      })
      gsap.to(Closeref.current, {
        opacity: 1,

      })
    } else {
      gsap.to(Panelref.current, {
        height: '0%',
        duration: 0.5,
        ease: 'power2.inOut',
        opacity: 0,
      })
      gsap.to(Closeref.current, {
        opacity: 0,

      })
    }

  }, [panel]);

  useGSAP(() => {

    if (vehiclePanel) {

      gsap.to(vehiclePanelref.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
      })

    } else {

      gsap.to(vehiclePanelref.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      })
    }
  }, [vehiclePanel]);

  useGSAP(() => {

    if (confirmRidePanel) {

      gsap.to(confirmRidePanelref.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
      })

    } else {

      gsap.to(confirmRidePanelref.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      })
    }
  }, [confirmRidePanel]);

  useGSAP(() => {

    if (driver) {

      gsap.to(driverref.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
      })

    } else {
      gsap.to(driverref.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      })

    }

  }, [driver]);


  useGSAP(() => {

    if (waitingfordriver) {

      gsap.to(waitingfordriverref.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
      })

    } else {
      gsap.to(waitingfordriverref.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
      })

    }

  }, [waitingfordriver]);

  async function Trip() {

    setpanel(false);
    setvehiclePanel(true);

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { 
        pickup: pick,          
        destination: destination
       },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

      setfare(response.data);
  }

  
    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup: pick,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        console.log(response.data);
    }

  return (
    <>
      <div className='relative overflow-hidden'>
        <img className='w-20 absolute' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="error" />

        <div>
          <img className='h-screen w-screen object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="error" />
        </div>

        <div className='flex flex-col justify-end absolute w-full h-screen top-0'>

          <div className='top-0 h-[35%] p-6 bg-white relative'>
            <h1 onClick={() => {
              setpanel(false);

            }} ref={Closeref} className='text-2xl absolute top-6 opacity-0 right-6 font-bold '>

              <i className="ri-arrow-down-wide-line"></i>
            </h1>
            <h4 className='text-2xl font-semibold'>Find a trip</h4>

            <form onSubmit={handleSearch}>
              <div className="line border-l-4 top-[40%] left-10 bg-gray-900 rounded-full h-16 absolute "></div>
              <input
                className='bg-[#dedede] w-full px-12 text-base mt-5 py-2 rounded outline-none'
                type="text"
                placeholder='Add a pick-up location'
                value={pick}
                onChange={(e) => {
                  setpick(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
                onFocus={() => {
                  setActiveField('pickup');
                  setpanel(true);
                }}
              />
              <input
                className='bg-[#dedede] w-full px-12 text-base mt-3 py-2 rounded outline-none'
                type="text"
                placeholder='Enter your destination'
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
                onFocus={() => {
                  setActiveField('destination');
                  setpanel(true);
                }}
              />
            </form>
            <button onClick={Trip} className='bg-black text-white py-2 px-4 rounded bottom-0 mt-3 w-full'>Find Trip</button>
          </div>

          <div ref={Panelref} className='bg-white '>
            <LocationSearchPanel
              suggestions={suggestions}
              onSelectSuggestion={handleSuggestionSelect}
              setpanel={setpanel}
              setvehiclePanel={setvehiclePanel}
            />
          </div>
        </div>

        <div ref={vehiclePanelref} className='fixed bottom-0 z-10 bg-white w-full translate-y-full h-[70%]'>
          <VehiclePanel fare={fare} selectVehicle={setvehicleType} setconfirmRidePanel={setconfirmRidePanel} setvehiclePanel={setvehiclePanel} />
        </div>

        <div ref={confirmRidePanelref} className='fixed bottom-0 z-10 translate-y-full bg-white w-full h-[70%] px-3'>
          <ConfirmRidePanel  createRide={createRide} pickup={pick} destination={destination} fare={fare} vehicleType={vehicleType} setdriver={setdriver} setconfirmRidePanel={setconfirmRidePanel} />
        </div>
        <div ref={driverref} className='fixed bottom-0 z-10 translate-y-full bg-white w-full h-[70%] px-3'>
          <LookingForDriver pickup={pick} destination={destination} fare={fare} vehicleType={vehicleType} setdriver={setdriver} />
        </div>
        <div ref={waitingfordriverref} className='fixed bottom-0 z-10 translate-y-full bg-white w-full h-[70%] px-3'>
          <WaitingForDriver setwaitingfordriver={setwaitingfordriver} />
        </div>
      </div>
    </>
  )
}

export default Home