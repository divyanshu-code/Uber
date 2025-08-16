import React from 'react'

const LocationSearchPanel = ( props ) => {

   const location = [
      "Gali No.1 , near peer baba gali , Kapashera , South West delhi",
      "Gali No.7 , matke vali gali , kalka ji Mandir , new delhi",
      "AB-27 , Sahil public school  , Noida  , Uttar Pradesh",
      "CD-69 , near metro station , Dwarka , New Delhi",
      "EF-12 , near sector 18 , Noida , Uttar Pradesh",
   ]
   return (
      <>
         <div className='p-5'>

            {location.map((ele, index) => {

               return (
                  <div key={index} 
                  onClick={() => {
                     props.setvehiclePanel(true);
                     props.setpanel(false)
                  }} className='flex items-center border-2 w-full  leading-tight px-5 py-2 border-white active:border-black rounded-xl justify-start  gap-3 my-2'>
                     <h2 className='bg-[#dedede]  rounded-full flex items-center justify-center'><i className="ri-map-pin-fill"></i></h2>
                     <h4 className='font-medium '>{ele}</h4>
                  </div>

               )
            })}

         </div>
      </>
   )
}

export default LocationSearchPanel