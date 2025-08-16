import React from 'react'

const WaitingForDriver = (props) => {
    return (
        <>
            <div>
                <h2
                    onClick={() => {
                        props.setwaitingfordriver(false)
                    }} className='text-center w-[93%] top-0 absolute'><i className="text-gray-200 text-2xl ri-arrow-down-wide-fill"></i></h2>


                <div className='flex items-center justify-between mt-7 '>
                    <img className='h-16' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="error" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>Divyanshu</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP04 AB 1234</h4>
                        <p className='text-gray-600 text-sm'>Maruti Sazuki Alto</p>
                    </div>
                </div>

                <div className='flex flex-col gap-2 items-center mt-10'>
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

                </div>
            </div>
        </>
    )
}

export default WaitingForDriver