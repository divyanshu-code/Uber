import React from 'react'

const RidePopUp = () => {
  return (
    <>
          <h2
                    onClick={() => {
                        props.setconfirmRidePanel(false)
                    }} className='text-center w-[93%] top-0 absolute'><i className="text-gray-200 text-2xl ri-arrow-down-wide-fill"></i></h2>
                    <h3 className='font-semibold mt-7 text-2xl '>Ride Available!</h3>

                    <div className='flex items-center justify-between rounded-xl bg-amber-300 px-2 mt-5'>
                        <div className='p-2 flex items-center gap-2 justify-start '>
                            <img className='h-10 w-10 rounded-full object-cover ' src="https://tse1.mm.bing.net/th/id/OIP.LgZrfreOIB0X5BhD9dw36QHaFj?pid=Api&P=0&h=180" alt="error" />
                            <h3 className='text-lg font-medium'>Divyanshu</h3>
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
                         
                         <button onClick={()=>{
                            props.setdriver(true)
                         }} className='w-full mt-3 bg-green-600 text-center font-bold text-lg text-white p-1  rounded-lg '>Confirm</button>
                         
                         <button onClick={()=>{
                            props.setdriver(true)
                         }} className='w-full  bg-red-600 text-center font-bold text-lg text-white p-1 rounded-lg '>Ignore</button>
                    </div>
    </>
  )
}

export default RidePopUp