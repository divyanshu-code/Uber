import React from 'react'

const CaptainDetails = () => {
  return (
    <>
    <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start gap-3' >
              <img className='h-12 w-12 rounded-full object-cover' src="https://tse1.mm.bing.net/th/id/OIP.LgZrfreOIB0X5BhD9dw36QHaFj?pid=Api&P=0&h=180" alt="error" />
              <h4 className='text-lg font-semibold'>Divyanshu</h4>
            </div>

            <div>
              <h4 className='text-xl font-bold'>₹250.0</h4>
              <p className='text-sm text-gray-600'>Earned</p>
            </div>
          </div>

          <div className='flex items-center justify-center gap-7 leading-tight p-3 bg-gray-100 mt-5 rounded-2xl'>
            <div className='text-center leading-tight'>
              <i className="text-2xl font-thin ri-time-line"></i>
              <h5 className='font-medium text-lg'>10.5</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
            <div className='text-center leading-tight'>
              <i className="text-2xl font-thin ri-speed-up-fill"></i>
              <h5 className='font-medium text-lg'>10.5</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
            <div className='text-center leading-tight'>
              <i className="text-2xl font-thin ri-sticky-note-line"></i>
              <h5 className='font-medium text-lg'>10.5</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
          </div>

    </>
  )
}

export default CaptainDetails