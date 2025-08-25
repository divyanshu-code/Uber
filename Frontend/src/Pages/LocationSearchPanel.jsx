import React from 'react'

const LocationSearchPanel = (props) => {
  const { suggestions, onSelectSuggestion, setvehiclePanel, setpanel } = props;

  return (
    <>
      <div className='p-5'>

        {suggestions.map((ele, index) => (
          <div
            key={index}
            onClick={() => {
              onSelectSuggestion(ele.displayName);          // send the selected suggestion text back
            //   setvehiclePanel(true);
            //   setpanel(false);
            }}
            className='flex items-center border-2 w-full leading-tight px-5 py-2 border-white active:border-black rounded-xl justify-start gap-3 my-2 cursor-pointer'
          >
            <h2 className='bg-[#dedede] rounded-full flex items-center justify-center p-2'>
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className='font-medium'>{ele.displayName}</h4>

          </div>
        ))}
      </div>
    </>
  )
}

export default LocationSearchPanel
