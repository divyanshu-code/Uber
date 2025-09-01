import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRidePop = (props) => {

    const navigate = useNavigate();

    async function endride() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ridedata?._id
        } ,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status >= 200 && response.status < 300) {
                props.setupper(false)

                navigate('/captain-home');

        }
    }

    return (
        <>
            <h2
                onClick={() => {
                    props.setupper(false)
                }} className='text-center w-[93%] top-0  absolute'><i className="text-gray-400 text-2xl ri-arrow-down-wide-fill"></i></h2>
            <h3 className='font-semibold mt-12 text-2xl '>Finish this Ride</h3>

            <div className='flex items-center justify-between rounded-xl bg-yellow-300 px-2 mt-5'>
                <div className='p-2 flex items-center gap-2 justify-start '>
                    <img className='h-10 w-10 rounded-full object-cover ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxglj3iwmlB9Y9oZBH3qicAgZcnj6dtdHN2Q&s" alt="error" />
                    <h3 className='text-lg font-medium'> {props.ridedata?.user.fullname.firstname + " "}{props.ridedata?.user.fullname.lastname}</h3>
                </div>
                <h5 className='font-semibold text-lg'>3.5 KM</h5>
            </div>

            <div className='flex flex-col gap-2 items-center p-2 '>

                <div className='w-full '>
                    <div className='flex items-center gap-3 leading-tight  border-b-2 border-gray-300 font-medium p-2'>
                        <i className="ri-map-pin-range-fill"></i>
                        <div>
                            <h3>Street No. 01</h3>
                            <p className='text-gray-600 text-sm'>{props.ridedata?.pickup} </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 leading-tight border-b-2 border-gray-300 font-medium mt-3 p-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3>Street No. 01</h3>
                            <p className='text-gray-600 text-sm'>{props.ridedata?.destination} </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 leading-tight  font-medium mt-3 p-2'>
                        <i className="ri-cash-line"></i>
                        <div >
                            <h3>₹{props.ridedata?.fare}</h3>
                            <p className='text-gray-600 text-sm'>Cash Cash</p>
                        </div>
                    </div>

                </div>

                <div className='mt-6 w-full'>
                      <button onClick={endride} className='w-full mt-3 bg-green-600 inline-block text-center font-bold text-lg text-white p-2  rounded-lg '>Finish ride</button>
                </div>
            </div>
        </>
    )
}

export default FinishRidePop