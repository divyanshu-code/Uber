import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import UserLogin from './Pages/UserLogin.jsx'
import UserSignup from './Pages/UserSignup.jsx'
import CaptainLogin from './Pages/CaptainLogin.jsx'
import CaptainSignup from './Pages/CaptainSignup.jsx'

const App = () => {
  return (
    <>
    
     <Routes>

      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<UserLogin/>} />
      <Route path='/signup' element={<UserSignup/>} />
      <Route path='/captain-login' element={<CaptainLogin/>} />
      <Route path='/captain-signup' element={<CaptainSignup/>} />

     </Routes>
    </>
  )
}

export default App