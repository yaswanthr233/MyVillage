import { useState,useEffect } from 'react'
import  {Routes, Route,useLocation} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login/index.jsx'
import Register from './pages/Register/index.jsx'
import Home from './pages/Home/index.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Discussions from './pages/Discussions/index.jsx'
import Navbar from './components/Navbar/index.jsx'
import Footer from './components/Footer/index.jsx'
import Community from './pages/Community/index.jsx'
import Issues from './pages/Issues/index.jsx'

function App() {
  const location = useLocation()
  const hideLayout = ['/login', '/register'].includes(location.pathname)
  
  return (
    <div className="App">
    {!hideLayout && <Navbar />}
    
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/discussions" element={<Discussions />} /> 
        <Route path="/community" element={<Community />}/>
        <Route path="/issues" element={<Issues />} /> 
      </Routes>
      {!hideLayout && <Footer/>}
      </div>
  )
}

export default App
