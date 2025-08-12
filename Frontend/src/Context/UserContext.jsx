import React, { createContext, useState } from 'react'

export const UserDataContext = createContext();

const UserContext = ({children}) => {

    const [user, setuser] = useState({

        email: '',
        fullname: {
            firstname: '',
            lastname: ''
        },
    })
  return (
    <>
     <UserDataContext.Provider value= {{user, setuser}}>
        {children}
     </UserDataContext.Provider>
    </>
  )
}

export default UserContext