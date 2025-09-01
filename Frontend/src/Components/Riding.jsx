import React, { useEffect  , useContext} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Socket } from '../Context/SocketContext'

function Riding() {

    const location = useLocation();
    const { ride } = location.state || {};

    const navigate = useNavigate();
    const  { socket } = useContext(Socket);

    socket.on('ride-ended' , ()=>{
        navigate('/home');
    });

    return (
        <>
            <div className='h-[90vh]'>
                 <Link to = "/home" className='fixed right-2 top-2 text-xl bg-white rounded-full flex items-center justify-center w-8  h-8 font-lg'>
                 
                 <i className="ri-home-line"></i>
                 </Link>
                <img className='h-1/2 w-screen object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="error" />

                <div className=''>
                    <div className='flex items-center justify-between mt-7 '>
                        <img className='h-16' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="error" />
                        <div className='text-right px-3'>
                            <h2 className='text-lg font-medium capitalize'> {ride?.captain?.fullname?.firstname} {ride?.user?.fullname?.lastname}</h2>
                            <h4 className='text-xl font-semibold -mt-1 -mb-1'> {ride?.captain?.vehicle?.plate}</h4>
                            <p className='text-gray-600 text-sm leading-5'>Maruti Sazuki Alto</p>
                        </div>
                    </div>
 
                    <div className='flex flex-col gap-2 items-center mt-7'>
                        <div className='w-full px-5 '>
                
                            <div className='flex items-center gap-3 leading-tight border-b-2  border-gray-300 font-medium p-2'>
                                <i className="ri-map-pin-user-fill"></i>
                                <div>
                                    <h3>Street No. 01</h3>
                                    <p className='text-gray-600 text-sm'> {ride?.destination}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 leading-tight  font-medium mt-3 p-2'>
                                <i className="ri-cash-line"></i>
                                <div >
                                    <h3>₹{ride?.fare}</h3>
                                    <p className='text-gray-600 text-sm'>Cash Cash</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='px-5 py-2'>
                    <button className='w-full mt-2 bg-green-600 text-center font-bold text-lg text-white p-1 py-2 rounded-lg'>Make a payment</button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Riding