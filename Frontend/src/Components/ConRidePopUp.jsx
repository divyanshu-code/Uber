import React from 'react'
import { Link } from 'react-router-dom'

const ConRidePopUp = (props) => {
  return (
     <>
            <h2
                onClick={() => {
                  props.setconfirm(false)
                }} className='text-center w-[93%] top-0  absolute'><i className="text-gray-300 text-2xl ri-arrow-down-wide-fill"></i></h2>
            <h3 className='font-semibold mt-15 text-2xl '>Confirm this ride to start!</h3>

            <div className='flex items-center justify-between rounded-xl bg-yellow-300 px-2 mt-5'>
                <div className='p-2 flex items-center gap-2 justify-start '>
                    <img className='h-10 w-10 rounded-full object-cover ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxglj3iwmlB9Y9oZBH3qicAgZcnj6dtdHN2Q&s" alt="error" />
                    <h3 className='text-lg font-medium'>Ashika rawat</h3>
                </div>
                <h5 className='font-semibold text-lg'>3.5 KM</h5>
            </div>

            <div className='flex flex-col gap-2 items-center p-2 '>
 
                <div className='w-full '>
                    <div className='flex items-center gap-3 leading-tight  border-b-2 border-gray-300 font-medium p-2'>
                        <i className="ri-map-pin-range-fill"></i>
                        <div>
                            <h3>Street No. 01</h3>
                            <p className='text-gray-600 text-sm'>Kapashera , south west delhi </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 leading-tight border-b-2 border-gray-300 font-medium mt-3 p-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3>Street No. 01</h3>
                            <p className='text-gray-600 text-sm'>Kapashera , south west delhi </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 leading-tight  font-medium mt-3 p-2'>
                        <i className="ri-cash-line"></i>
                        <div >
                            <h3>₹193.20</h3>
                            <p className='text-gray-600 text-sm'>Cash Cash</p>
                        </div>
                    </div>

                </div>

               <Link to="/captain-riding" className='w-full mt-7 bg-green-600 text-center font-bold text-lg text-white p-2  rounded-lg '>Confirm</Link>

                <button onClick={() => {
                    props.setconfirm(false)
                     props.setride(false)
                }} className='w-full  bg-red-600 text-center font-bold text-lg text-white p-2 rounded-lg '>Cancel</button>

               
            </div>
        </>
  )
}

export default ConRidePopUp