import React, { useState,useContext } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../Context/UserContext';


const UserProtectedWrapper = ({children}) => {

    const token = localStorage.getItem('token');
    const { user, setuser } = useContext(UserDataContext);
    const [isloading, setisloading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {

            navigate('/login'); 
        }
        
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((response) => {
    
            if (response.status >= 200 && response.status < 300) {
              setuser(response.data.user);
              setisloading(false);
            }
          }).catch((error) => {
            console.error("Error fetching user profile:", error);
            localStorage.removeItem('token');
            navigate('/login');
    
            })

    }, [token]);



    if(isloading) {
       
        return (
            <div>Loading...</div>
        )
    }

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper