import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './Pages/UserLogin.jsx'
import UserSignup from './Pages/UserSignup.jsx'
import CaptainLogin from './Pages/CaptainLogin.jsx'
import CaptainSignup from './Pages/CaptainSignup.jsx'
import Start from './Pages/Start.jsx'
import Home from './Pages/Home.jsx'
import UserProtectedWrapper from './Pages/UserProtectedWrapper.jsx'
import UserLogout from './Pages/UserLogout.jsx'
import Captain_Home from './Pages/Captain_Home.jsx'
import CaptainProtectedWrapper from './Pages/CaptainProtectedWrapper.jsx'
import Riding from './Components/Riding.jsx'

const App = () => {
  return (
    <>

      <Routes>

        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/riding' element={<Riding/>} />
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>} />

        <Route path='/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>} />

        <Route path='/captain-home' element={

          <CaptainProtectedWrapper>

            <Captain_Home />

          </CaptainProtectedWrapper>

        } />

        <Route path='/captain-logout' element={
          <CaptainProtectedWrapper>
            <UserLogout />
          </CaptainProtectedWrapper>} />

      </Routes>
    </>
  )
}

export default App