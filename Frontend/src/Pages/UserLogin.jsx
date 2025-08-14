import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../Context/UserContext.jsx'
import axios from 'axios'

const UserLogin = () => {

  const [email, emailfirst] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { user ,setuser } = useContext(UserDataContext)

  const handleLogin =async (e) => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password
    }

    const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUser)

    if (response.status >= 200 && response.status < 300) {
      const data = response.data;

      setuser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/Home');
    }

    setPassword('');
    emailfirst('');
  }

  return (
    <>
      <div className='p-5 h-screen flex flex-col justify-between'>

        <div>
          <img className='w-20 mb-3' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="error" />

          <form action="" className='ml-2' onSubmit={handleLogin}>
            <h3 className='text-lg font-medium mb-2'>What's your email ?</h3>
            <input className='bg-[#dedede]  rounded mb-6 px-4 py-2 border w-full text-lg placeholder:text-base'
              required type="email"
              value={email}
              onChange={(e) =>
                emailfirst(e.target.value)
              }

              placeholder='email@gmail.com' />

            <h3 className='text-lg font-medium mb-2'>Enter password</h3>
            <input className='bg-[#dedede] rounded mb-6 px-4 py-2 border w-full text-lg placeholder:text-base'
              required type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder='password' />

            <button className='bg-black font-semibold rounded mb-3 text-white px-4 py-2  w-full text-lg placeholder:text-base' >Login</button>
          </form>

          <div className='flex items-center justify-center gap-2'>
            <p>New here? </p><Link to='/signup' className='text-blue-600'>  Create new account </Link>

          </div>
        </div>

        <div className='mt-10'>

          <Link to='/captain-login' className='bg-blue-500 inline-block text-center font-semibold rounded mb-7  ml-2 text-white px-4 py-2  w-[86.5vw] text-lg placeholder:text-base' >Sign in as captain</Link>
        </div>


      </div>
    </>
  )
}

export default UserLogin