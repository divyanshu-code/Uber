import React, { createContext, useState } from 'react'
export const CaptainDataContext = createContext();

const CaptainContext = ({children}) => {
 
  const [captain, setcaptain] = useState(null)
  const [isloading, setisloading] = useState(false)
  const [error, seterror] = useState(null)

  const value = {

    captain,
    setcaptain, 
    isloading,
    setisloading,
    error,
    seterror

  }

  return (
    <>
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    </>
  )
}

export default CaptainContext