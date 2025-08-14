import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../Context/CaptainContext';
import axios from 'axios';


const CaptainProtectedWrapper = ({children}) => {


    const [isloading, setisloading] = useState(true);
    const { captain, setcaptain } =useContext(CaptainDataContext);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {

        if (!token) {

            navigate('/captain-login'); 
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {
          if (response.status >= 200 && response.status < 300) {
              setcaptain(response.data.captain);
            setisloading(false);
          }
        }).catch((error) => {
          console.error("Error fetching captain profile:", error);
          localStorage.removeItem('token');
          navigate('/captain-login');
    
        });
        
    }, [token]);
    


    if (isloading) {  
        
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

export default CaptainProtectedWrapper