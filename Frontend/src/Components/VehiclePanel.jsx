import React from 'react'

const VehiclePanel = (props) => {
  return (
   <>
   
          <h2 
           onClick={()=>{
                props.setvehiclePanel(false)
           }} className='text-center top-0'><i className="text-gray-200 text-2xl ri-arrow-down-wide-fill"></i></h2> 

           <div onClick={()=>{
              props.setconfirmRidePanel(true)
           }} className='flex items-center justify-start'>
              <img className='w-24 ml-5 ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
              <p className='font-medium'>Price : 200.0</p>
           </div>
   </>
  )
}

export default VehiclePanel