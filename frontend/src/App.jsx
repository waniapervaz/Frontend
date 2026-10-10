import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Index from './Index'
import Signup from './Signup'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import VerfifyOtp from './VerfifyOtp'
import ChangePassword from './ChangePassword'
function App() {

  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/signup" element={<Signup/>} />
       <Route path="/login" element={<Login/>} />
         <Route path="/forgot-password" element={<ForgotPassword/>} />
           <Route path="/verifyotp" element={<VerfifyOtp/>} />
           <Route path="/changepassword" element={<ChangePassword/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
